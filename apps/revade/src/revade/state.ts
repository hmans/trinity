import { Controller } from "@hmans/controlfreak"
import { EntityWith, Tag } from "miniplex"
import { createECS } from "miniplex-react"
import p2 from "p2-es"
import { makeStore } from "statery"
import { Object3D, Vector3 } from "three"

type PlayerTag = {
  player: Tag
}

type EnemyTag = {
  enemy: Tag
}

type LevelTag = {
  level: Tag
}

type SploderTag = {
  sploder: Tag
}

type SplosionTag = {
  splosion: Tag
}

type PickupTag = {
  pickup: Tag
}

type AttractionComponent = {
  attraction: {
    targets: EntityWith<Entity, "transform">[]
    factor: number
  }
}

type AutoComponent = {
  auto: {
    delay: number
    callback: Function
  }
}

type AvoidanceComponent = {
  avoidance: {
    targets: EntityWith<Entity, "transform">[]
    factor: number
  }
}

type CameraComponent = {
  camera: {
    offset: [number, number, number]
  }
}

type ControllerComponent = {
  controller: Controller
}

type EnemySpawnerComponent = {
  enemySpawner: {
    t: number
    interval: number
    amount: number
  }
}

type LifetimeComponent = {
  lifetime: number
}

type PhysicsBodyComponent = {
  body: p2.Body
}

type SpawnAtComponent = {
  spawnAt: Vector3
}

type TransformComponent = {
  transform: Object3D
}

type VelocityComponent = {
  velocity: Vector3
}

type OptionalComponents = PlayerTag &
  EnemyTag &
  LevelTag &
  SploderTag &
  SplosionTag &
  PickupTag &
  AttractionComponent &
  AutoComponent &
  AvoidanceComponent &
  CameraComponent &
  ControllerComponent &
  EnemySpawnerComponent &
  LifetimeComponent &
  PhysicsBodyComponent &
  SpawnAtComponent &
  TransformComponent &
  VelocityComponent

export type Entity = Partial<OptionalComponents>

export const ECS = createECS<Entity>()

export const Layers = {
  Default: 1,
  Player: 2,
  Enemies: 4,
  Pickups: 8,
  Splosions: 16
}

export const store = makeStore({ score: 0, multiplier: 1 })
