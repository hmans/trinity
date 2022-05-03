import { createECS } from "miniplex-react"
import { Tag } from "miniplex"

export type Entity = {
  isAsteroid: Tag
  isCamera: Tag
  isPlayer: Tag
  transform: Object3D
}

export const ECS = createECS<Entity>()
