import { useTicker } from "@hmans/trinity"
import { Tag } from "miniplex"
import { plusMinus } from "randomish"
import { useRef } from "react"
import { Vector3 } from "three"
import { ECS } from "../state"

const players = ECS.world.archetype("player").entities

const tmpVec3 = new Vector3()

const getSpawnPosition = () => {
  tmpVec3.set(plusMinus(55), plusMinus(55), 0)

  return tmpVec3.clone()
}

export const EnemySpawner = ({ interval = 0.5 }) => {
  const cooldown = useRef(interval)

  useTicker("update", (dt) => {
    cooldown.current -= dt
    if (cooldown.current <= 0) {
      cooldown.current += interval

      ECS.world.createEntity({ enemy: Tag, spawnAt: getSpawnPosition() })
    }
  })

  return null
}
