import { Controller } from "@hmans/controlfreak"
import { EntityWith, Tag } from "miniplex"
import { createECS } from "miniplex-react"
import p2 from "p2-es"
import { makeStore } from "statery"
import { Object3D, Vector3 } from "three"

export type Entity = {
  player?: Tag
  enemy?: Tag
  sploder?: Tag
  splosion?: Tag
  pickup?: Tag

  /* Camera */
  camera?: {
    offset: [number, number, number]
  }

  /* Movement */
  spawnAt?: Vector3
  transform?: Object3D
  velocity?: Vector3

  /* Physics */
  body?: p2.Body

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

  /* Input */
  controller?: Controller
}

export const ECS = createECS<Entity>()

export const Layers = {
  Default: 1,
  Player: 2,
  Enemies: 4,
  Pickups: 8,
  Splosions: 16
}

export const store = makeStore({ score: 0, multiplier: 1 })
