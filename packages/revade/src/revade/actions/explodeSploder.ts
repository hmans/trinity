import { Tag } from "miniplex"
import { ECS, Entity } from "../state"
import { explodeEnemy } from "./explodeEnemy"

const enemies = ECS.world.archetype("enemy", "transform").entities

export const explodeSploder = (entity: Entity & { sploder: Tag }) => {
  const position = entity.transform!.position

  /* Spawn a splosion */
  ECS.world.queue.createEntity({
    splosion: Tag,
    spawnAt: position.clone()
  })

  /* And destroy myself */
  ECS.world.queue.destroyEntity(entity)

  /* Destroy all enemies that are within the explosion radius */
  for (const enemy of enemies) {
    if (enemy.transform.position.distanceTo(position) < 20) {
      /* Remove enemy */
      explodeEnemy(enemy)

      /* Spawn a score pickup */
      ECS.world.queue.createEntity({
        pickup: Tag,
        spawnAt: enemy.transform.position
      })
    }
  }
}
