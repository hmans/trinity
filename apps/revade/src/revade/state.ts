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

type SploderTag = {
  sploder: Tag
}

type SplosionTag = {
  splosion: Tag
}

type PickupTag = {
  pickup: Tag
}

type CameraComponent = {
  camera: {
    offset: [number, number, number]
  }
}

type PhysicsBodyComponent = {
  body: p2.Body
}

type ControllerComponent = {
  controller: Controller
}

type OptionalComponents = PlayerTag &
  EnemyTag &
  SploderTag &
  SplosionTag &
  PickupTag &
  CameraComponent &
  PhysicsBodyComponent &
  ControllerComponent

export type Entity = {
  /* Movement */
  spawnAt?: Vector3
  transform?: Object3D
  velocity?: Vector3

  /* Flocking */
  attraction?: {
    targets: EntityWith<Entity, "transform">[]
    factor: number
  }

  avoidance?: {
    targets: EntityWith<Entity, "transform">[]
    factor: number
  }

  /* Animations */
  wobble?: {
    speed: number
    t: number
  }

  /* Tools */
  lifetime?: number

  auto?: {
    delay: number
    callback: Function
  }

  enemySpawner?: {
    t: number
    interval: number
    amount: number
  }
} & Partial<OptionalComponents>

export const ECS = createECS<Entity>()

export const Layers = {
  Default: 1,
  Player: 2,
  Enemies: 4,
  Pickups: 8,
  Splosions: 16
}

export const store = makeStore({ score: 0, multiplier: 1 })
