import { Object3D } from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import * as miniplex from "miniplex"
import { RegisteredEntity } from "miniplex"

export type PhysicsEntity = {
  rigidBody: RAPIER.RigidBody
  transform: Object3D
}

/**
 * Physics World!
 */
export class PhysicsWorld extends Object3D {
  public world: RAPIER.World
  public ecs = new miniplex.World<PhysicsEntity>()

  private archetypes = {
    bodies: this.ecs.archetype("transform", "rigidBody")
  }

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

    for (const { rigidBody, transform } of this.archetypes.bodies.entities) {
      const t = rigidBody.translation()
      const q = rigidBody.rotation()

      transform.position.set(t.x, t.y, t.z)
      transform.quaternion.set(q.x, q.y, q.z, q.w)
    }
  }
}

/**
 * RigidBody!
 */
export class RigidBody extends Object3D {
  private world?: PhysicsWorld
  private entity?: RegisteredEntity<PhysicsEntity>

  constructor() {
    super()

    /* When this object is reparented, have it connect to its world. */
    this.addEventListener("added", () => {
      /* Find world */
      this.traverseAncestors((o) => {
        if (o instanceof PhysicsWorld) this.world = o
      })

      /* Create a body */
      let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setAdditionalMass(10)

      this.entity = this.world!.ecs.createEntity({
        rigidBody: this.world!.world.createRigidBody(rigidBodyDesc),
        transform: this
      })
    })

    this.addEventListener("removed", () => {
      this.world!.ecs.destroyEntity(this.entity!)
      this.entity = undefined
    })
  }
}
