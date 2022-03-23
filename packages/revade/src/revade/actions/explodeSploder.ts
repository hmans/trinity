import { Tag } from "miniplex"
import { ECS, Entity } from "../state"

export const explodeSploder = (entity: Entity & { sploder: Tag }) => {
  /* Spawn a splosion */
  ECS.world.queue.createEntity({
    splosion: Tag,
    spawnAt: entity.transform?.position.clone()
  })

  /* And destroy myself */
  ECS.world.queue.destroyEntity(entity)
}
