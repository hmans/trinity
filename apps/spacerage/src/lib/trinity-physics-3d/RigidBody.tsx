import RAPIER from "@dimforge/rapier3d-compat"
import { forwardRef, ReactNode, useEffect, useState } from "react"
import T from "react-trinity"
import { Object3D } from "three"
import { usePhysics } from "./PhysicsWorld"

type RigidBodyAttributes = {
  additionalMass?: number
}

type RigidBodyProps = {
  children?: ReactNode
} & RigidBodyAttributes

export const RigidBody = forwardRef<Object3D, RigidBodyProps>(
  ({ children, additionalMass, ...props }, ref) => {
    const body = useRigidBody({ additionalMass })
    return <T.Object3D {...props}>{children}</T.Object3D>
  }
)

const useRigidBody = (attrs: RigidBodyAttributes) => {
  const { world } = usePhysics()
  const [body, setBody] = useState<RAPIER.RigidBody>()

  useEffect(() => {
    setBody(() => {
      const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
      return world.createRigidBody(rigidBodyDesc)
    })

    return () => {
      if (body) world.removeRigidBody(body)
      setBody(undefined)
    }
  }, [world])

  return body
}
