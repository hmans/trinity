import { useStore } from "statery"
import { GameFSM } from "./GameFSM"
import { store } from "./state"

import * as UI from "../lib/ui"

const theme = {
  color: "white",
  font: "4vw/1 'Helvetica Neue'",
  fontWeight: "bold"
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
        <UI.Text anchor="top">REVADE</UI.Text>
        <UI.Text anchor="bottom">~ HIT SPACE TO START ~</UI.Text>
      </GameFSM.Match>

      <GameFSM.Match state="gameover">
        <UI.Text anchor="bottom">~ HIT SPACE TO CONTINUE ~</UI.Text>
      </GameFSM.Match>

      <GameFSM.Match state={["gameplay", "gameover"]}>
        <UI.Panel anchor="top-left">
          <UI.Text>SCORE: {scoreString}</UI.Text>
          <UI.Text>MULTIPLIER: {multiplierString}x</UI.Text>
        </UI.Panel>
      </GameFSM.Match>
    </UI.Canvas>
  )
}
