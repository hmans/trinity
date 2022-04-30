import { makeComponent } from "react-trinity"
import { PhysicsWorld as PhysicsWorldImpl } from "../three-rapier-3d"

export const PhysicsWorld = makeComponent(PhysicsWorldImpl, "PhysicsWorld")
