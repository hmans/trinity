import { Object3D } from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"

export const makePhysics = () => {
  /**
   * Physics World!
   */
  class PhysicsWorld extends Object3D {
    public world: RAPIER.World

    constructor() {
      super()

      /* Create world */
      const gravity = { x: 0, y: -9.81, z: 0 }
      this.world = new RAPIER.World(gravity)
    }
  }

  /**
   * RigidBody!
   */
  class RigidBody extends Object3D {}

  return { PhysicsWorld, RigidBody }
}
