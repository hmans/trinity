import { createECS } from "miniplex-react"
import { Tag } from "miniplex"
import { Object3D } from "three"

export type Entity = {
  isAsteroid: typeof Tag
  isCamera: typeof Tag
  isPlayer: typeof Tag
  isBullet: typeof Tag

  transform: Object3D
  initialTransform?: Object3D
}

export const ECS = createECS<Entity>()
