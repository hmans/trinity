import { Tag } from "miniplex"
import { ECS, Entity } from "../state"
import { increaseScore } from "./increaseScore"

export const explodeEnemy = (enemy: Entity & { enemy: Tag }) => {
  increaseScore(100)
  ECS.world.queue.destroyEntity(enemy)
}
