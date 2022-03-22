import { Controller } from "@hmans/controlfreak"
import { BoundlessGrid } from "@hmans/ingrid"
import { IEntity, QueriedEntity, Tag } from "miniplex"
import { createECS } from "miniplex/react"
import p2 from "p2-es"
import { Object3D, Vector3 } from "three"

export type Entity = {
  player?: Tag
  enemy?: Tag
  sploder?: Tag
  splosion?: Tag

  /* Camera */
  camera?: {
    offset: [number, number, number]
  }

  /* Movement */
  spawnAt?: Vector3
  transform?: Object3D
  velocity?: Vector3

  /* Spatial Hashing */
  spatialHashing?: { grid: BoundlessGrid<QueriedEntity<Entity, ["transform"]>> }

  /* Physics */
  body?: p2.Body

  /* Flocking */
  attraction?: {
    targets: QueriedEntity<Entity, ["transform"]>[]
    factor: number
  }

  avoidance?: {
    targets: QueriedEntity<Entity, ["transform"]>[]
    factor: number
  }

  /* Animations */
  wobble?: {
    speed: number
    t: number
  }

  /* Tools */
  auto?: {
    delay: number
    callback: Function
  }

  /* Input */
  controller?: Controller
} & IEntity

export const ECS = createECS<Entity>()

export const spatialHashGrid = new BoundlessGrid(10)

export const Layers = {
  Player: 1,
  Enemies: 2,
  Pickups: 4,
  Splosions: 8
}
