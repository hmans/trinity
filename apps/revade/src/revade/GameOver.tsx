import { useTicker } from "@react-trinity/ticker"
import { Text } from "@react-trinity/toybox"
import { useEffect } from "react"
import { filter } from "./audio"
import { controller } from "./controller"
import { GameFSM } from "./Game"

export const GameOver = () => {
  useTicker("update", () => {
    if (controller.controls.fire.value) {
      GameFSM.transition("returnToMenu")
    }
  })

  useEffect(() => {
    filter.frequency.rampTo(300, 1)
  }, [])

  return (
    <>
      <Text
        rotation-z={-0.2}
        fontSize={10}
        color="hotpink"
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        GAME OVER
      </Text>
    </>
  )
}
