import { Object3D } from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"

/**
 * Physics World!
 */
export class PhysicsWorld extends Object3D {
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

  public update(dt: number) {
    this.world.step()
  }
}

/**
 * RigidBody!
 */
export class RigidBody extends Object3D {
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
