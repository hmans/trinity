import { useStore } from "statery"
import { GameFSM } from "./GameFSM"
import { store } from "./state"

import * as UI from "../lib/ui"
import { CSSProperties } from "react"

const theme: CSSProperties = {
  color: "white",
  font: "4vw/1 'Anek Tamil', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  textShadow: "rgba(0, 0, 0, 0.7) 3px 3px 4px"
}

const ScoreDisplay = () => {
  const { score, multiplier } = useStore(store)

  const scoreString = score.toLocaleString("de-DE", {
    maximumFractionDigits: 0
  })
  const multiplierString = multiplier.toLocaleString("de-DE", {
    maximumFractionDigits: 0
  })

  return (
    <UI.VerticalGroup
      anchor="top-left"
      gap={10}
      margin="min(30px, 4vw)"
      fontSize="60%"
      color="lime"
      textShadow="black 1px 1px 3px, rgba(0, 255, 0, 0.99) 0px 0px 20px"
    >
      <UI.Text>
        SCORE: <strong>{scoreString}</strong>
      </UI.Text>
      <UI.Text>
        MULTIPLIER: <strong>{multiplierString}x</strong>
      </UI.Text>
    </UI.VerticalGroup>
  )
}

const Menu = () => {
  return (
    <>
      <UI.Text
        anchor="top"
        marginTop="5vmin"
        fontSize="25vmin"
        fontWeight={800}
        color="#fa3"
        textShadow="#fa38 0px 0px 40px, white 10px 10px, hotpink 20px 20px, hotpink 20px 20px 40px"
      >
        REVADE
      </UI.Text>

      <UI.Text anchor="bottom" marginBottom="10vmin">
        <UI.Button>START</UI.Button>
        <UI.Button>OPTIONS</UI.Button>
        <UI.Button>CREDITS</UI.Button>
      </UI.Text>
    </>
  )
}

export const HUD = () => (
  <UI.Canvas theme={theme}>
    <GameFSM.Match state="menu">
      <Menu />
    </GameFSM.Match>

    <GameFSM.Match state="gameover">
      <UI.Text anchor="bottom" marginBottom="min(50px, 4vw)">
        ~ HIT SPACE TO CONTINUE ~
      </UI.Text>
    </GameFSM.Match>

    <GameFSM.Match state={["gameplay", "gameover"]}>
      <ScoreDisplay />
    </GameFSM.Match>
  </UI.Canvas>
)
