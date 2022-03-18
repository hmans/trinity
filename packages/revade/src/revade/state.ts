import { Controller } from "@hmans/controlfreak"
import { IEntity, Tag } from "miniplex"
import { createECS } from "miniplex/react"
import { Object3D } from "three"

export type Entity = {
  player: Tag
  enemy: Tag

  transform?: Object3D
  controller?: Controller
} & IEntity

export const ecs = createECS<Entity>()
