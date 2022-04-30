import { makeComponent } from "react-trinity"
import * as Impl from "../three-rapier-3d"

export const PhysicsWorld = makeComponent(Impl.PhysicsWorld, "PhysicsWorld")
export const RigidBody = makeComponent(Impl.RigidBody, "RigidBody")
