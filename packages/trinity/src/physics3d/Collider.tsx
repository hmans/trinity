import * as RAPIER from "@dimforge/rapier3d-compat"
import React, { forwardRef, ReactNode, useEffect } from "react"
import { Object3D } from "three"
import T, { ReactorComponentProps } from ".."
import { usePhysics } from "./PhysicsWorld"
import { useRigidBody } from "./RigidBody"

type ColliderProps = {
  children?: ReactNode
}

const useCollider = (descFactory: () => RAPIER.ColliderDesc) => {
  const { world } = usePhysics()
  const { rigidBody } = useRigidBody()

  useEffect(() => {
    const collider = world.createCollider(descFactory(), rigidBody.handle)

    return () => {
      if (collider && world.colliders.contains(collider.handle))
        world.removeCollider(collider, true)
    }
  }, [rigidBody, world])
}

export const BoxCollider = forwardRef<
  Object3D,
  ColliderProps & ReactorComponentProps<typeof Object3D>
>((props, ref) => {
  useCollider(() => RAPIER.ColliderDesc.cuboid(2, 2, 2))
  return <T.Object3D {...props} ref={ref} />
})

export const SphereCollider = forwardRef<
  Object3D,
  ColliderProps & ReactorComponentProps<typeof Object3D>
>((props, ref) => {
  useCollider(() => RAPIER.ColliderDesc.ball(0.5))
  return <T.Object3D {...props} ref={ref} />
})
