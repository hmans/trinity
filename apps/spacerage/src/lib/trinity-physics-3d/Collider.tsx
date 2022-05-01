import { ReactNode } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import { forwardRef } from "react"
import T, { ReactorComponentProps } from "react-trinity"
import { Object3D } from "three"
import { useRigidBody } from "./RigidBody"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { usePhysics } from "./PhysicsWorld"

type ColliderProps = {
  children?: ReactNode
}

export const Collider = forwardRef<
  Object3D,
  ColliderProps & ReactorComponentProps<typeof Object3D>
>(({ children, ...props }, ref) => {
  const { world } = usePhysics()
  const { body } = useRigidBody()

  useEffect(() => {
    const desc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5)
    const collider = world.createCollider(desc, body.handle)

    return () => {
      world.removeCollider(collider, true)
    }
  }, [body])

  return (
    <T.Object3D {...props} ref={ref}>
      {children}
    </T.Object3D>
  )
})
