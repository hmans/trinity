import { Tag } from "miniplex"
import { ECS, Entity } from "../state"

export const explodePlayer = (player: Entity & { player: Tag }) => {
  ECS.world.queue.destroyEntity(player)
  console.log("GAME OVER 💩")
}
