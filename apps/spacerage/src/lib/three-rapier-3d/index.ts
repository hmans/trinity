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
    /* TODO: accumulate dt here and/or change step size (Rapier can take it) */
    this.world.step()

    /* Transfer transform data from physics simulation to Three.js scene */
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

  public additionalMass: number = 0

  constructor() {
    super()

    /* When this object is reparented, have it connect to its world. */
    this.addEventListener("added", () => {
      /* Find world */
      this.traverseAncestors((o) => {
        if (o instanceof PhysicsWorld) this.world = o
      })

      /* Create a body descriptor */
      const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setAdditionalMass(
        this.additionalMass
      )

      /* Create the actual RigidBody. */
      const rigidBody = this.world!.world.createRigidBody(rigidBodyDesc)

      /* Register an entity with the physics world's ECS. */
      this.entity = this.world!.ecs.createEntity({
        rigidBody,
        transform: this
      })
    })

    this.addEventListener("removed", () => {
      /* Destroy the rigidbody */
      this.world!.world.removeRigidBody(this.entity!.rigidBody)

      /* Destroy the entity */
      this.world!.ecs.destroyEntity(this.entity!)

      /* Forget about the world, but without the booze */
      this.world = undefined
    })
  }
}

/**
 * Collider!
 */
export class Collider extends Object3D {
  constructor() {
    super()
  }
}
