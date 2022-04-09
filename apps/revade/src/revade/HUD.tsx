import { useEffect, useState } from "react"
import { useTicker } from "react-trinity"
import { useStore } from "statery"
import * as UI from "../lib/ui"
import { filter } from "./audio"
import { controller } from "./controller"
import { GameFSM } from "./GameFSM"
import { store } from "./state"
import theme from "./ui-theme.module.css"

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
      style={{
        gap: 10,
        margin: "min(30px, 4vw)",
        fontSize: "60%",
        color: "lime",
        textShadow: "black 1px 1px 3px, rgba(0, 255, 0, 0.99) 0px 0px 20px"
      }}
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
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => setReady(true), 500)
  }, [])

  useEffect(() => {
    filter.frequency.rampTo(300, 2)
  }, [])

  useTicker("update", () => {
    if (controller.controls.fire.value) {
      startGame()
    }
  })

  const startGame = () => {
    if (ready) {
      GameFSM.transition("startGame")
    }
  }

  return (
    <>
      <UI.Panel anchor="top">
        <UI.Text
          anchor="top"
          style={{
            marginTop: "5vmin",
            fontSize: "25vmin",
            fontWeight: 800,
            color: "#fa3",
            textShadow:
              "#fa38 0px 0px 40px, white 10px 10px, hotpink 20px 20px, hotpink 20px 20px 40px"
          }}
        >
          REVADE
        </UI.Text>
      </UI.Panel>

      {ready && (
        <UI.VerticalGroup
          anchor="bottom"
          style={{ marginBottom: 50, gap: "1rem" }}
        >
          <UI.Button onClick={startGame}>START</UI.Button>
          <UI.Button>OPTIONS</UI.Button>
          <UI.Button>CREDITS</UI.Button>
        </UI.VerticalGroup>
      )}
    </>
  )
}

export const HUD = () => (
  <UI.Canvas className={theme.theme}>
    <GameFSM.Match state="menu">
      <Menu />
    </GameFSM.Match>

    <GameFSM.Match state="gameover">
      <UI.Text anchor="bottom" style={{ marginBottom: "min(50px, 4vw)" }}>
        ~ HIT SPACE TO CONTINUE ~
      </UI.Text>
    </GameFSM.Match>

    <GameFSM.Match state={["gameplay", "gameover"]}>
      <ScoreDisplay />
    </GameFSM.Match>
  </UI.Canvas>
)
