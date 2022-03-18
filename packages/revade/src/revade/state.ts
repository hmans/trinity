import { Controller } from "@hmans/controlfreak"
import { IEntity, QueriedEntity, Tag } from "miniplex"
import { createECS } from "miniplex/react"
import { Object3D, Vector3 } from "three"

export type Entity = {
  player: Tag
  enemy: Tag

  /* Movement */
  transform?: Object3D
  velocity?: Vector3

  /* Flocking */
  attraction?: {
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
