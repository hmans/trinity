import { makeReactor } from "react-trinity"
import { makePhysics } from "../three-rapier-3d"

export const { PhysicsWorld, RigidBody } = makeReactor(makePhysics())
