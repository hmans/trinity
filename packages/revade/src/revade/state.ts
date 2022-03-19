import { Controller } from "@hmans/controlfreak"
import { BoundlessGrid } from "@hmans/ingrid"
import { IEntity, QueriedEntity, Tag } from "miniplex"
import { createECS } from "miniplex/react"
import { Body } from "planck"
import { Object3D, Vector3 } from "three"

export type Entity = {
  player: Tag
  enemy: Tag

  /* Movement */
  transform?: Object3D
  velocity?: Vector3

  /* Spatial Hashing */
  spatialHashing: { grid: BoundlessGrid<QueriedEntity<Entity, ["transform"]>> }

  /* Physics */
  body?: Body

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

  /* Input */
  controller?: Controller
} & IEntity

export const ECS = createECS<Entity>()

export const spatialHashGrid = new BoundlessGrid(10)
