import { IEntity, Tag } from "miniplex"
import { createECS } from "miniplex/react"
import { Object3D } from "three"

type Entity = {
  player: Tag

  position: Object3D
} & IEntity

export const ecs = createECS<Entity>()
