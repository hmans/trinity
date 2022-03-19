import T, { Engine, Text, useCamera, View } from "@hmans/trinity"
import { PerspectiveCamera } from "three"
import { Enemies } from "./Enemies"
import { HUD } from "./HUD"
import { PhysicsWorld } from "./lib/physics2d"
import { Player } from "./Player"
import Systems from "./systems"

const Camera = () => {
  const camera = useCamera<PerspectiveCamera>()
  return <T.PerspectiveCamera ref={camera} position={[0, 0, 50]} />
}

export const Game = () => (
  <>
    <HUD />
    <Engine>
      <Systems />

      <View>
        <PhysicsWorld gravity={[0, 0]}>
          <T.AmbientLight />
          <Player />
          <Enemies />
          <Camera />
        </PhysicsWorld>
      </View>
    </Engine>
  </>
)
