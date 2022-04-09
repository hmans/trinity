import { useStore } from "statery"
import { GameFSM } from "./GameFSM"
import { store } from "./state"

import * as UI from "../lib/ui"
import { CSSProperties } from "react"

const theme: CSSProperties = {
  color: "white",
  font: "4vw/1 'Helvetica Neue'",
  fontWeight: "bold",
  textShadow: "rgba(0, 0, 0, 0.7) 3px 3px 4px"
}

export const HUD = () => {
  const { score, multiplier } = useStore(store)

  const scoreString = score.toLocaleString("de-DE", {
    maximumFractionDigits: 0
  })
  const multiplierString = multiplier.toLocaleString("de-DE", {
    maximumFractionDigits: 0
  })

  return (
    <UI.Canvas theme={theme}>
      <GameFSM.Match state="menu">
        <UI.Text anchor="top" marginTop={50} fontSize="200%" color="orange">
          REVADE
        </UI.Text>
        <UI.Text anchor="bottom" marginBottom={30}>
          ~ HIT SPACE TO START ~
        </UI.Text>
      </GameFSM.Match>

      <GameFSM.Match state="gameover">
        <UI.Text anchor="bottom" marginBottom={30}>
          ~ HIT SPACE TO CONTINUE ~
        </UI.Text>
      </GameFSM.Match>

      <GameFSM.Match state={["gameplay", "gameover"]}>
        <UI.VerticalGroup
          anchor="top-left"
          gap={10}
          margin={30}
          fontSize="60%"
          color="lime"
        >
          <UI.Text>SCORE: {scoreString}</UI.Text>
          <UI.Text>MULTIPLIER: {multiplierString}x</UI.Text>
        </UI.VerticalGroup>
      </GameFSM.Match>
    </UI.Canvas>
  )
}
