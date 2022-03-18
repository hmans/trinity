import { Controller } from "@hmans/controlfreak"
import { IEntity, Tag } from "miniplex"
import { createECS } from "miniplex/react"
import { Object3D, Vector3 } from "three"

export type Entity = {
  player: Tag
  enemy: Tag

  /* Movement */
  transform?: Object3D
  velocity?: Vector3

  /* Input */
  controller?: Controller
} & IEntity

export const ECS = createECS<Entity>()
