import T, { Engine, View } from "@hmans/trinity"
import React from "react"
import { makeFSM } from "../lib/FSM"
import { PhysicsWorld } from "../lib/physics2d"
import { Camera } from "./entities/Camera"
import { GameOver } from "./GameOver"
import { Gameplay } from "./Gameplay"
import { HUD } from "./HUD"
import { Level } from "./Level"
import { Menu } from "./Menu"

export const GameFSM = makeFSM({
  states: ["menu", "gameplay", "pause", "gameover"],
  state: "menu",
  transitions: {
    startGame: { from: "menu", to: "gameplay" },
    pauseGame: { from: "gameplay", to: "pause" },
    resumeGame: { from: "pause", to: "gameplay" },
    abortGame: { from: "pause", to: "menu" },
    gameOver: { from: "gameplay", to: "gameover" },
    returnToMenu: { from: ["gameover", "gameplay"], to: "menu" }
  }
})

export const Game = () => (
  <>
    <HUD />
    <Engine>
      <View>
        <T.AmbientLight intensity={0.3} />
        <T.DirectionalLight intensity={0.2} position={[10, 10, 10]} />
        <Camera />

        <PhysicsWorld gravity={[0, 0]}>
          <Level />

          <GameFSM.Match state="menu">
            <Menu />
          </GameFSM.Match>

          <GameFSM.Match state={["gameplay", "gameover"]}>
            <Gameplay />

            <GameFSM.Match state="gameover">
              <GameOver />
            </GameFSM.Match>
          </GameFSM.Match>
        </PhysicsWorld>
      </View>
    </Engine>
  </>
)
