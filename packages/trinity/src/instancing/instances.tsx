import { Tag, World } from "miniplex"
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
import { applyProps } from "../reactor/lib/applyProps"

/* Create a local reactor with the Three.js classes we need */
const T = makeReactor({ Group, InstancedMesh, Object3D })

type InstanceEntity = {
  instance: Tag
  transform: Object3D
  visible: boolean
}

export const makeInstanceComponents = (
  systemFactory?: (world: World<InstanceEntity>) => () => void
) => {
  /* We're using Miniplex as a state container. */
  const ECS = createECS<InstanceEntity>()

  /* If a system factory has been passed, prepare the custom system. */
  const system = systemFactory && systemFactory(ECS.world)

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

    function updateInstances() {
      const imesh = instancedMesh.current

      const l = entities.length
      let count = 0

      for (let i = 0; i < l; i++) {
        const { transform, visible } = entities[i]

        if (visible) {
          if (transform) {
            imesh.setMatrixAt(i, transform.matrix)
          }

          count++
        }
      }

      imesh.instanceMatrix.needsUpdate = true
      imesh.count = count
    }

    useTicker("render", () => {
      system?.()
      updateInstances()
    })

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
      applyProps(group, props)

      /* TODO: parent?! */

      useImperativeHandle(ref, () => group)

      useEffect(() => {
        const entity = ECS.world.createEntity({
          instance: Tag,
          transform: group,
          visible: true
        })
        return () => ECS.world.destroyEntity(entity)
      }, [])

      return null
    }
  )

  const useThinInstance = (count = 1) =>
    useEffect(() => {
      const entities = new Array<InstanceEntity>()

      for (let i = 0; i < count; i++) {
        entities.push(
          ECS.world.createEntity({
            instance: Tag,
            transform: new Object3D(),
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

  const ThinInstance: FC<{ count?: number }> = ({ count = 1 }) => {
    useThinInstance(count)
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
