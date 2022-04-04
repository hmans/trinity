import { Tag } from "miniplex"
import { number, plusMinus } from "randomish"
import { Quaternion, Vector3 } from "three"
import ArchetypeSystem from "../../lib/ArchetypeSystem"
import { ECS } from "../state"

const players = ECS.world.archetype("player").entities
const levels = ECS.world.archetype("level", "transform").entities

const tmpVec3 = new Vector3()
const position = new Vector3()

const getSpawnPosition = (vec3: Vector3, rotation: Quaternion) => {
  vec3.set(plusMinus(50), plusMinus(50), 0)
  vec3.applyQuaternion(rotation)
}

export const EnemySpawner = () => (
  <ArchetypeSystem archetype={["enemySpawner"]}>
    {(entities, dt) => {
      const level = levels[0]
      if (!level) return

      for (const { enemySpawner } of entities) {
        /* Time bookkeeping */
        enemySpawner.t -= dt

        /* Spawn enemies? */
        if (enemySpawner.t <= 0) {
          enemySpawner.t += enemySpawner.interval
          console.log("Spawning enemies")

          /* Increase difficulty */
          enemySpawner.interval = Math.max(enemySpawner.interval - 0.1, 0.5)

          /* Find a position that's not too close to the player */
          getSpawnPosition(position, level.transform.quaternion)
          while (
            players[0] &&
            players[0].transform &&
            position.distanceTo(players[0].transform.position) < 50
          ) {
            getSpawnPosition(position, level.transform.quaternion)
          }

          /* Spawn a couple of enemies with a random distance around the position */
          for (let i = 0; i < enemySpawner.amount; i++) {
            ECS.world.queue.createEntity({
              enemy: Tag,
              spawnAt: tmpVec3
                .randomDirection()
                .multiplyScalar(number(5))
                .add(position)
                .clone()
            })
          }
        }
      }
    }}
  </ArchetypeSystem>
)
