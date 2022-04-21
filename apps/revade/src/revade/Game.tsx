import { Device } from "@hmans/controlfreak"
import { useEffect, useState } from "react"
import { Renderer, View } from "react-trinity"
import {
  LensDirt,
  UnrealBloomPass,
  Vignette
} from "react-trinity/postprocessing"
import T from "react-trinity/reactor"
import { Ticker } from "react-trinity/ticker"
import { PerspectiveCamera, Scene } from "three"
import { PhysicsWorld } from "../lib/physics2d"
import { Music } from "./audio"
import { controller } from "./controller"
import { Camera } from "./entities/Camera"
import { GameFSM } from "./GameFSM"
import { GameOver } from "./GameOver"
import { Gameplay } from "./Gameplay"
import { HUD } from "./HUD"
import { Level } from "./Level"
import { Menu } from "./Menu"
import Systems from "./systems"

export const Game = () => {
  const [camera, setCamera] = useState<PerspectiveCamera | null>(null!)
  const [scene, setScene] = useState<Scene | null>(null!)

  useEffect(() => {
    controller.start()
    return () => controller.stop()
  }, [])

  useEffect(() => {
    const handleDeviceChange = (d: Device) => console.log("Device change:", d)

    controller.onDeviceChange.add(handleDeviceChange)
    return () => controller.onDeviceChange.remove(handleDeviceChange)
  }, [])

  return (
    <Ticker>
      <HUD />
      <Renderer>
        {camera && scene && (
          <View camera={camera} scene={scene}>
            <UnrealBloomPass />
            <LensDirt texture="/textures/dirt01.png" strength={0.5} />
            <Vignette offset={0.5} darkness={2} />
          </View>
        )}

        <PhysicsWorld gravity={[0, 0]}>
          <T.Scene ref={setScene}>
            <T.AmbientLight intensity={0.3} />
            <T.DirectionalLight intensity={0.2} position={[10, 10, 10]} />

            <Music />
            <Systems />
            <Camera ref={setCamera} />
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
          </T.Scene>
        </PhysicsWorld>
      </Renderer>
    </Ticker>
  )
}
