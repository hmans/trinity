import RAPIER from "@dimforge/rapier3d-compat"
import { createContext } from "react"
import { useContext } from "react"
import { useRef } from "react"
import { forwardRef, ReactNode, useEffect, useState } from "react"
import T from "react-trinity"
import { Object3D } from "three"
import { PhysicsEntity, usePhysics } from "./PhysicsWorld"
import mergeRefs from "react-merge-refs"
import { MutableRefObject } from "react"

const RigidBodyContext = createContext<{ body: RAPIER.RigidBody }>(null!)

export const useRigidBody = () => useContext(RigidBodyContext)

type RigidBodyAttributes = {
  additionalMass?: number
}

type RigidBodyProps = {
  children?: ReactNode
} & RigidBodyAttributes

export const RigidBody = forwardRef<Object3D, RigidBodyProps>(
  ({ children, additionalMass, ...props }, ref) => {
    const o3d = useRef<Object3D>(null!)
    const { world, ecs } = usePhysics()
    const [rigidBody, setRigidBody] = useState<RAPIER.RigidBody>()
    const [entity, setEntity] = useState<PhysicsEntity>()

    useEffect(() => {
      const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
      const rigidBody = world.createRigidBody(rigidBodyDesc)
      const entity = ecs.createEntity({ transform: o3d.current, rigidBody })

      setRigidBody(rigidBody)
      setEntity(entity)

      return () => {
        world.removeRigidBody(rigidBody)
        setRigidBody(undefined)
        setEntity(undefined)
      }
    }, [world])

    return (
      <T.Object3D ref={mergeRefs([ref, o3d])} {...props}>
        {rigidBody && entity && (
          <RigidBodyContext.Provider value={{ body: rigidBody }}>
            {children}
          </RigidBodyContext.Provider>
        )}
      </T.Object3D>
    )
  }
)
