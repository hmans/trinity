import { useTicker } from "@hmans/trinity"
import { Tag } from "miniplex"
import { plusMinus } from "randomish"
import { useRef } from "react"
import { Vector3 } from "three"
import { ECS } from "../state"

export const SploderSpawner = ({ interval = 3 }) => {
  const cooldown = useRef(interval)

  useTicker("update", (dt) => {
    cooldown.current -= dt
    if (cooldown.current <= 0) {
      cooldown.current += interval

      ECS.world.createEntity({
        sploder: Tag,
        spawnAt: new Vector3(plusMinus(50), plusMinus(50), 0)
      })
    }
  })

  return null
}
