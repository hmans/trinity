import { Object3D } from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"

/*
We're going to do a funky HOF thing, and yes, there's a reason
for this. Let's go!
*/

export const makePhysics = () => {
  /**
   * Physics World!
   */
  class PhysicsWorld extends Object3D {
    public world: RAPIER.World

    constructor() {
      super()
      this.world = new RAPIER.World({ x: 0, y: -9.81, z: 0 })
    }

    public get gravity() {
      return this.world.gravity
    }

    public set gravity(v: RAPIER.Vector) {
      this.world.gravity = v
    }
  }

  /**
   * RigidBody!
   */
  class RigidBody extends Object3D {
    private world!: PhysicsWorld
    public body!: RAPIER.RigidBody

    constructor() {
      super()

      /* When this object is reparented, have it connect to its world. */
      this.addEventListener("added", () => {
        /* Find world */
        this.traverseAncestors((o) => {
          if (o instanceof PhysicsWorld) {
            this.world = o
          }
        })

        /* Create a body */
        let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        let rigidBody = this.world.world.createRigidBody(rigidBodyDesc)
      })
    }
  }

  /* We're done. Let's go. */
  return { PhysicsWorld, RigidBody }
}
