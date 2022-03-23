import { useTicker } from "@hmans/trinity"
import { Tag } from "miniplex"
import { plusMinus, number } from "randomish"
import { useRef } from "react"
import { Vector3 } from "three"
import { ECS } from "../state"

const players = ECS.world.archetype("player").entities

const tmpVec3 = new Vector3()
const position = new Vector3()

const getSpawnPosition = (vec3: Vector3) => {
  vec3.set(plusMinus(55), plusMinus(55), 0)
}

export const EnemySpawner = ({ interval = 2, amount = 5 }) => {
  const cooldown = useRef(interval)

  useTicker("update", (dt) => {
    cooldown.current -= dt

    if (cooldown.current <= 0) {
      cooldown.current += interval

      getSpawnPosition(position)
      while (position.distanceTo(players[0].transform!.position) < 50) {
        getSpawnPosition(position)
      }

      for (let i = 0; i < amount; i++) {
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
  })

  return null
}
