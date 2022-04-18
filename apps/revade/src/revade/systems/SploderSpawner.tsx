import { useTicker } from "react-trinity/ticker"
import { Tag } from "miniplex"
import { plusMinus } from "randomish"
import { useRef } from "react"
import { Vector3 } from "three"
import { ECS } from "../state"

const levels = ECS.world.archetype("level", "transform").entities

export const SploderSpawner = ({ interval = 3 }) => {
  const cooldown = useRef(interval)

  useTicker("update", (dt) => {
    const level = levels[0]
    if (!level) return

    cooldown.current -= dt
    if (cooldown.current <= 0) {
      cooldown.current += interval

      ECS.world.createEntity({
        sploder: Tag,
        spawnAt: new Vector3(plusMinus(50), plusMinus(50), 0).applyQuaternion(
          level.transform.quaternion
        )
      })
    }
  })

  return null
}
