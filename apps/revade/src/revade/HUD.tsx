import * as UI from "@hmans/ui"
import { useEffect, useState } from "react"
import { useStore } from "statery"
import { filter } from "./audio"
import { GameFSM } from "./GameFSM"
import { store } from "./state"
import { TouchController } from "./TouchController"
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
    <UI.Panel top="30px" left="30px">
      <UI.Group
        spacing={10}
        style={{
          color: "lime",
          fontSize: "70%",
          textShadow: "black 1px 1px 3px, rgba(0, 255, 0, 0.99) 0px 0px 20px"
        }}
      >
        <UI.Text>
          SCORE: <strong>{scoreString}</strong>
        </UI.Text>
        <UI.Text>
          MULTIPLIER: <strong>{multiplierString}x</strong>
        </UI.Text>
      </UI.Group>
    </UI.Panel>
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

  const startGame = () => {
    if (ready) {
      GameFSM.transition("startGame")
    }
  }

  return (
    <>
      <UI.Panel center top="min(50px, 5vw)">
        <UI.Text
          style={{
            fontSize: "25vmin",
            fontWeight: 800,
            color: "#fa3",
            textShadow:
              "#fa38 0px 0px 4vmin, white 1vmin 1vmin, hotpink 2vmin 2vmin, hotpink 2vmin 2vmin 4vmin, black 0px 0px 6vmin"
          }}
        >
          REVADE
        </UI.Text>
      </UI.Panel>

      {ready && (
        <UI.Panel bottom={30} center>
          <UI.Group vertical spacing={20}>
            <UI.Button onClick={startGame} autoFocus>
              START
            </UI.Button>
            <UI.Button>OPTIONS</UI.Button>
            <UI.Button>CREDITS</UI.Button>
          </UI.Group>
        </UI.Panel>
      )}
    </>
  )
}

export const HUD = () => {
  return (
    <UI.Canvas className={theme.theme}>
      <GameFSM.Match state="menu">
        <Menu />
      </GameFSM.Match>

      <GameFSM.Match state="gameover">
        <UI.Panel center bottom="min(50px, 4vw)">
          <UI.Text>~ HIT SPACE TO CONTINUE ~</UI.Text>
        </UI.Panel>
      </GameFSM.Match>

      <GameFSM.Match state="gameplay">
        <TouchController />
      </GameFSM.Match>

      <GameFSM.Match state={["gameplay", "gameover"]}>
        <ScoreDisplay />
      </GameFSM.Match>
    </UI.Canvas>
  )
}
