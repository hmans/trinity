import * as RAPIER from "@dimforge/rapier3d-compat"
import { forwardRef, ReactNode, useEffect } from "react"
import T, { ReactorComponentProps } from "react-trinity"
import { Object3D } from "three"
import { usePhysics } from "./PhysicsWorld"
import { useRigidBody } from "./RigidBody"

type ColliderProps = {
  children?: ReactNode
}

export const Collider = forwardRef<
  Object3D,
  ColliderProps & ReactorComponentProps<typeof Object3D>
>(({ children, ...props }, ref) => {
  const { world } = usePhysics()
  const { rigidBody } = useRigidBody()

  useEffect(() => {
    const desc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5)
    const collider = world.createCollider(desc, rigidBody.handle)

    return () => {
      if (collider && world.colliders.contains(collider.handle))
        world.removeCollider(collider, true)
    }
  }, [rigidBody, world])

  return (
    <T.Object3D {...props} ref={ref}>
      {children}
    </T.Object3D>
  )
})
