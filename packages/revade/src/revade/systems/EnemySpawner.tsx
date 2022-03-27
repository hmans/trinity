import { Tag } from "miniplex"
import { number, plusMinus } from "randomish"
import { Vector3 } from "three"
import ArchetypeSystem from "../../lib/ArchetypeSystem"
import { GameFSM } from "../Game"
import { ECS } from "../state"

const players = ECS.world.archetype("player").entities
const spawners = ECS.world.archetype("spawner").entities

const tmpVec3 = new Vector3()
const position = new Vector3()

const getSpawnPosition = (vec3: Vector3) => {
  vec3.set(plusMinus(55), plusMinus(55), 0)
}

export const EnemySpawner = () => (
  <ArchetypeSystem archetype={["spawner"]}>
    {(entities, dt) => {
      for (const { spawner } of entities) {
        spawner.t -= dt
        if (spawner.t <= 0) {
          spawner.t += spawner.interval

          getSpawnPosition(position)
          while (
            players[0] &&
            players[0].transform &&
            position.distanceTo(players[0].transform.position) < 50
          ) {
            getSpawnPosition(position)
          }

          for (let i = 0; i < spawner.amount; i++) {
            ECS.world.createEntity({
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
