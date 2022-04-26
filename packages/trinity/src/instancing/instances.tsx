import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef
} from "react"
import { Group, InstancedMesh, Object3D } from "three"
import { useTicker } from "../engine"
import {
  makeReactor,
  ReactorComponentProps,
  useManagedThreeObject
} from "../reactor"

/* Create a local reactor with the Three.js classes we need */
const T = makeReactor({ Group, InstancedMesh, Object3D })

type InstanceEntity = {
  instance: Tag
  transform?: Object3D
  visible: boolean
}

export const makeInstanceComponents = () => {
  /* We're using Miniplex as a state container. */
  const ECS = createECS<InstanceEntity>()

  /* This component renders the InstancedMesh itself and continuously updates it
     from the data in the ECS. */
  const Root: FC<ReactorComponentProps<typeof InstancedMesh> & {
    countStep?: number
  }> = ({ children, countStep = 1000, ...props }) => {
    const instancedMesh = useRef<InstancedMesh>(null!)

    /* The following hook will make sure this entire component gets re-rendered when
       the number of instance entities changes. We're using this to dynamically grow
       or shrink the instance buffer. */
    const { entities } = ECS.world

    const instanceLimit =
      Math.floor(entities.length / countStep + 1) * countStep

    const dummy = new Object3D()

    function updateInstances() {
      const imesh = instancedMesh.current

      const l = entities.length
      let count = 0

      for (let i = 0; i < l; i++) {
        const { transform, visible } = entities[i]

        if (visible) {
          if (transform) {
            imesh.setMatrixAt(i, transform.matrix)
          } else {
            dummy.position.set(
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25
            )
            dummy.updateMatrix()
            imesh.setMatrixAt(i, dummy.matrix)
          }
          count++
        }
      }

      imesh.instanceMatrix.needsUpdate = true
      imesh.count = count
    }

    useTicker("render", updateInstances)

    return (
      <T.InstancedMesh
        ref={instancedMesh}
        {...props}
        args={[null!, null!, instanceLimit]}
      >
        {children}
      </T.InstancedMesh>
    )
  }

  /* The Instance component will create a new ECS entity storing a reference
     to a three.js scene object. */
  const Instance = forwardRef<Group, ReactorComponentProps<typeof Group>>(
    (props, ref) => {
      const group = useManagedThreeObject(() => new Group())
      // group.matrixAutoUpdate = false
      useImperativeHandle(ref, () => group)

      /* TODO: put a ref on the Group and figure out how the cloneElement trick in miniplex-react can assign to multipe refs */

      return (
        <ECS.Entity>
          <ECS.Component name="transform">
            <T.Group object={group} {...props} />
          </ECS.Component>

          <ECS.Component name="visible" data={true} />
        </ECS.Entity>
      )
    }
  )

  const useThinInstance = (count = 1) =>
    useEffect(() => {
      const entities = new Array<InstanceEntity>()

      for (let i = 0; i < count; i++) {
        entities.push(
          ECS.world.createEntity({
            instance: Tag,
            visible: true
          })
        )
      }

      return () => {
        for (let i = 0; i < count; i++) {
          ECS.world.destroyEntity(entities[i])
        }
      }
    }, [])

  const ThinInstance = () => {
    useThinInstance()

    return null
  }

  return {
    world: ECS.world,
    useArchetype: ECS.useArchetype,
    useThinInstance,
    Root,
    Instance,
    ThinInstance
  }
}
