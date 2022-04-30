import { Object3D } from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import * as miniplex from "miniplex"
import { RegisteredEntity } from "miniplex"

export type PhysicsEntity = {
  rigidBody?: RAPIER.RigidBody
  collider?: RAPIER.Collider
  transform: Object3D
}

const bodyQueue = new Array<Function>()
const colliderQueue = new Array<Function>()

/**
 * Physics World!
 */
export class PhysicsWorld extends Object3D {
  public world: RAPIER.World
  public ecs = new miniplex.World<PhysicsEntity>()

  private archetypes = {
    rigidBodies: this.ecs.archetype("transform", "rigidBody")
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
    /* Process body queue */
    if (bodyQueue.length > 0) {
      bodyQueue.forEach((fn) => fn())
      bodyQueue.length = 0
    }

    /* Process collider queue */
    if (colliderQueue.length > 0) {
      colliderQueue.forEach((fn) => fn())
      colliderQueue.length = 0
    }

    /* TODO: accumulate dt here and/or change step size (Rapier can take it) */
    this.world.step()

    /* Transfer transform data from physics simulation to Three.js scene */
    for (const { rigidBody, transform } of this.archetypes.rigidBodies
      .entities) {
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
  public physicsWorldObject?: PhysicsWorld
  public entity?: RegisteredEntity<PhysicsEntity>

  public additionalMass: number = 0

  constructor() {
    super()

    this.addEventListener("added", this.mount)
    this.addEventListener("removed", this.unmount)
  }

  private mount() {
    bodyQueue.push(() => {
      /* Find world */
      this.physicsWorldObject = findAncestorOfType(this, PhysicsWorld)

      /* Create a body descriptor */
      const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setAdditionalMass(
        this.additionalMass
      )

      /* Create the actual RigidBody. */
      const rigidBody = this.physicsWorldObject!.world.createRigidBody(
        rigidBodyDesc
      )

      /* Register an entity with the physics world's ECS. */
      this.entity = this.physicsWorldObject!.ecs.createEntity({
        rigidBody,
        transform: this
      })
    })
  }

  private unmount() {
    bodyQueue.push(() => {
      /* Destroy the rigidbody */
      this.physicsWorldObject!.world.removeRigidBody(this.entity!.rigidBody!)

      /* Destroy the entity */
      this.physicsWorldObject!.ecs.destroyEntity(this.entity!)

      /* Forget about the world, but without the booze */
      this.physicsWorldObject = undefined
    })
  }
}

/**
 * Collider!
 */
export class Collider extends Object3D {
  private rigidBodyObject?: RigidBody
  public entity?: RegisteredEntity<PhysicsEntity>

  constructor() {
    super()
    this.addEventListener("added", this.mount)
    this.addEventListener("removed", this.unmount)
  }

  private mount() {
    colliderQueue.push(() => {
      /* Find the rigidbody we're part of */
      this.rigidBodyObject = findAncestorOfType(this, RigidBody)

      /* Create collider descriptor */
      const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5)

      /* Create collider */
      const collider = this.rigidBodyObject!.physicsWorldObject!.world!.createCollider(
        colliderDesc,
        this.rigidBodyObject?.entity!.rigidBody!.handle
      )

      /* Create entity */
      this.entity = this.rigidBodyObject!.physicsWorldObject!.ecs.createEntity({
        collider,
        transform: this
      })
    })
  }

  private unmount() {
    colliderQueue.push(() => {
      /* Destroy collider */
      this.rigidBodyObject!.physicsWorldObject!.world.removeCollider(
        this.entity?.collider!,
        true
      )

      /* Destroy entity */
      this.rigidBodyObject!.physicsWorldObject!.ecs.destroyEntity(this.entity!)

      /* Disconnect from RigidBody */
      this.rigidBodyObject = undefined
    })
  }
}

function findAncestorOfType<T>(
  origin: Object3D,
  klass: { new (...args: any[]): T }
) {
  let r: T | undefined

  origin.traverseAncestors((a) => {
    if (!r && a instanceof klass) r = a
  })

  return r
}
