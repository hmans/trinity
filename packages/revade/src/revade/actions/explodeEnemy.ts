import { Tag } from "miniplex"
import { ECS, Entity } from "../state"

export const explodeEnemy = (enemy: Entity & { enemy: Tag }) => {
  ECS.world.queue.destroyEntity(enemy)
}
