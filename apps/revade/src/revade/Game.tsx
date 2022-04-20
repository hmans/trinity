import { Device } from "@hmans/controlfreak"
import T from "react-trinity/reactor"
import React, { useEffect, useRef, useState } from "react"
import { Renderer, View } from "react-trinity"
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
import { Ticker } from "react-trinity/ticker"
import { PerspectiveCamera, Scene, Vector2 } from "three"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { EffectPass, LensDirt, Vignette } from "react-trinity/postprocessing"

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
            <EffectPass pass={RenderPass} args={[scene, camera]} />
            <EffectPass
              pass={UnrealBloomPass}
              args={[new Vector2(256, 256), 1.5, 0.8, 0.3]}
            />
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
