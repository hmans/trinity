import T, { Engine, Text, useCamera, View } from "@hmans/trinity"
import { PerspectiveCamera } from "three"
import { Enemies } from "./Enemies"
import { HUD } from "./HUD"
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
        <T.AmbientLight />
        <Player />
        <Enemies />
        <Camera />
      </View>
    </Engine>
  </>
)
