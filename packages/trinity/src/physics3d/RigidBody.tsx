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
import { Object3D, Quaternion, Vector3 } from "three"
import { transform } from "typescript"
import T from ".."
import { ReactorComponentProps } from "../reactor"
import { PhysicsEntity, usePhysics } from "./PhysicsWorld"

type RigidBodyState = {
  rigidBody: RAPIER.RigidBody
  entity: PhysicsEntity
}

type RigidBodyAttributes = {
  additionalMass?: number
}

type RigidBodyProps = {
  children?: ReactNode
} & RigidBodyAttributes &
  ReactorComponentProps<typeof Object3D>

const RigidBodyContext = createContext<RigidBodyState>(null!)

export const useRigidBody = () => useContext(RigidBodyContext)

export const RigidBody = forwardRef<Object3D, RigidBodyProps>(
  ({ children, additionalMass, ...props }, ref) => {
    const o3d = useRef<Object3D>(null!)
    const { world, ecs } = usePhysics()

    const [state, setState] = useState<RigidBodyState>()

    useEffect(() => {
      const desc = RAPIER.RigidBodyDesc.dynamic()

      /* Inherit existing transform */
      const pos = new Vector3()
      const quat = new Quaternion()
      o3d.current.getWorldPosition(pos)
      desc.setTranslation(pos.x, pos.y, pos.z)
      o3d.current.getWorldQuaternion(quat)
      desc.setRotation(quat)

      /* Create RigidBody */
      const rigidBody = world.createRigidBody(desc)

      /* Register entity */
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
