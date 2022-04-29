import { IEntity, Tag, World } from "miniplex"
import { createECS } from "miniplex-react"
import React, { FC, forwardRef, useEffect, useRef } from "react"
import { DynamicDrawUsage, Group, InstancedMesh, Object3D, Usage } from "three"
import { useTicker } from "../engine"
import { makeReactor, ReactorComponentProps } from "../reactor"

/* Create a local reactor with the Three.js classes we need */
const T = makeReactor({ Group, InstancedMesh, Object3D })

export type InstanceComponents = {
  instance: Tag
  transform: Object3D
  visible: boolean
}

export type InstanceEntity<CustomComponents = IEntity> = CustomComponents &
  InstanceComponents

export const makeInstanceComponents = <Custom extends IEntity = IEntity>({
  systemFactory,
  entityFactory,
  usage = DynamicDrawUsage
}: {
  entityFactory?: () => Custom
  systemFactory?: (world: World<InstanceEntity<Custom>>) => (dt: number) => void
  usage?: Usage
}) => {
  /* We're using Miniplex as a state container. */
  const ECS = createECS<InstanceEntity<Custom>>()

  /* If a system factory has been passed, prepare the custom system. */
  const system = systemFactory && systemFactory(ECS.world)

  /* This component renders the InstancedMesh itself and continuously updates it
     from the data in the ECS. */
  const Root: FC<ReactorComponentProps<typeof InstancedMesh> & {
    instanceLimit?: number
  }> = ({ instanceLimit = 10000, ...props }) => {
    const instancedMesh = useRef<InstancedMesh>(null!)

    useEffect(() => {
      instancedMesh.current.instanceMatrix.setUsage(usage)
    }, [])

    const { entities } = ECS.useArchetype("transform", "visible")

    function updateInstanceMatrix() {
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

    useTicker("render", (dt) => {
      system?.(dt)
      updateInstanceMatrix()
    })

    return (
      <T.InstancedMesh
        {...props}
        ref={instancedMesh}
        args={[null!, null!, instanceLimit]}
      />
    )
  }

  const useInstances = (count = 1) =>
    ECS.useEntities(count, () => ({
      ...(entityFactory ? entityFactory() : ({} as Custom)),
      instance: Tag,
      transform: new Object3D(),
      visible: true
    }))

  const Instance = forwardRef<Group, ReactorComponentProps<typeof Group>>(
    (props, ref) => (
      <T.Object3D {...props} object={useInstances(1)[0].transform} ref={ref} />
    )
  )

  const ThinInstance: FC<{ count?: number }> = ({ count = 1 }) => {
    useInstances(count)
    return null
  }

  return {
    world: ECS.world,
    useArchetype: ECS.useArchetype,
    useInstances,
    Root,
    Instance,
    ThinInstance
  }
}
