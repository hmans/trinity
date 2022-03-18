import T, { Engine, useCamera, View } from "@hmans/trinity"
import { PerspectiveCamera } from "three"
import { Player } from "./Player"
import Systems from "./systems"

const Camera = () => {
  const camera = useCamera<PerspectiveCamera>()
  return <T.PerspectiveCamera ref={camera} position={[0, 0, 50]} />
}

export const Game = () => (
  <Engine>
    <Systems />

    <View>
      <T.AmbientLight />
      <Player />
      <Camera />
    </View>
  </Engine>
)
