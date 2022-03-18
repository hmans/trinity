import T, { Engine, View } from "@hmans/trinity"
import { useView } from "@hmans/trinity/src/engine/View"
import { useEffect, useRef } from "react"
import type { PerspectiveCamera } from "three"
import { Player } from "./Player"
import Systems from "./systems"

const Camera = () => {
  const { setCamera } = useView()
  const camera = useRef<PerspectiveCamera>(null!)

  useEffect(() => {
    setCamera(camera.current)
  }, [camera.current])

  return <T.PerspectiveCamera ref={camera} position={[0, 0, 100]} />
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
