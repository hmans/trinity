import { makeReactor } from "react-trinity"
import * as Impl from "../three-rapier-3d"

export const { PhysicsWorld, RigidBody, Collider } = makeReactor(Impl)
