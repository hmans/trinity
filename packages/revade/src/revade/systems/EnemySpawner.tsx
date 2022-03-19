import { useTicker } from "@hmans/trinity"
import { Tag } from "miniplex"
import { useRef } from "react"
import { ECS } from "../state"

export const EnemySpawner = ({ interval = 1 }) => {
  const cooldown = useRef(interval)

  useTicker("update", (dt) => {
    cooldown.current -= dt
    if (cooldown.current <= 0) {
      cooldown.current += interval

      ECS.world.createEntity({ enemy: Tag })
    }
  })

  return null
}
