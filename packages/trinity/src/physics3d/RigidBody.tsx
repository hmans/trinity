import RAPIER from "@dimforge/rapier3d-compat"
import React, {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import mergeRefs from "react-merge-refs"
import { Object3D } from "three"
import T from ".."
import { PhysicsEntity, usePhysics } from "./PhysicsWorld"

type RigidBodyState = {
  rigidBody: RAPIER.RigidBody
  entity: PhysicsEntity
}

const RigidBodyContext = createContext<RigidBodyState>(null!)

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

    const [state, setState] = useState<RigidBodyState>()

    useEffect(() => {
      const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
      const rigidBody = world.createRigidBody(rigidBodyDesc)
      const entity = ecs.createEntity({ transform: o3d.current, rigidBody })

      setState({ rigidBody, entity })

      return () => {
        world.removeRigidBody(rigidBody)
        setState(undefined)
      }
    }, [world])

    return (
      <T.Object3D ref={mergeRefs([ref, o3d])} {...props}>
        {state && (
          <RigidBodyContext.Provider value={state}>
            {children}
          </RigidBodyContext.Provider>
        )}
      </T.Object3D>
    )
  }
)
