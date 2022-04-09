import T from "@react-trinity/reactor"
import React from "react"
import { Renderer, Ticker, View } from "react-trinity"
import { PhysicsWorld } from "../lib/physics2d"
import { Music } from "./audio"
import { Camera } from "./entities/Camera"
import { GameFSM } from "./GameFSM"
import { GameOver } from "./GameOver"
import { Gameplay } from "./Gameplay"
import { HUD } from "./HUD"
import { Level } from "./Level"
import { Menu } from "./Menu"
import Systems from "./systems"

export const Game = () => (
  <Ticker>
    <HUD />
    <Renderer>
      <View>
        <PhysicsWorld gravity={[0, 0]}>
          <T.AmbientLight intensity={0.3} />
          <T.DirectionalLight intensity={0.2} position={[10, 10, 10]} />

          <Music />
          <Systems />
          <Camera />
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
    </Renderer>
  </Ticker>
)
