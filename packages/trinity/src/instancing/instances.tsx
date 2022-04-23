import { IEntity } from "miniplex"
import { createECS } from "miniplex-react"
import React, {
  FC,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef
} from "react"
import mergeRefs from "react-merge-refs"
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
  /** The Three.js scene object defining this instance's transform. */
  transform: Object3D
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
    const { entities } = ECS.useArchetype("transform", "visible")

    const instanceLimit =
      Math.floor(entities.length / countStep + 1) * countStep

    function updateInstances() {
      const imesh = instancedMesh.current

      const l = entities.length
      let count = 0

      for (let i = 0; i < l; i++) {
        const { transform, visible } = entities[i]

        if (visible) {
          imesh.setMatrixAt(i, transform.matrixWorld)
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
    ({ children, ...groupProps }, ref) => {
      const group = useManagedThreeObject(() => new Group())

      useImperativeHandle(ref, () => group)

      return (
        <ECS.Entity>
          <ECS.Component name="transform">
            <T.Group object={group} {...groupProps}>
              {children}
            </T.Group>
          </ECS.Component>

          <ECS.Component name="visible" data={true} />
        </ECS.Entity>
      )
    }
  )

  return { world: ECS.world, useArchetype: ECS.useArchetype, Root, Instance }
}
