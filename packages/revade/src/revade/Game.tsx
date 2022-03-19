import T, { Engine, useCamera, View } from "@hmans/trinity"
import { FC } from "react"
import { PerspectiveCamera } from "three"
import { Enemies } from "./Enemies"
import { HUD } from "./HUD"
import { PhysicsWorld } from "./lib/physics2d"
import { Player } from "./Player"
import { ECS } from "./state"
import Systems from "./systems"

const Camera: FC<{ offset?: [number, number, number] }> = ({
  offset = [0, 0, 50]
}) => {
  const camera = useCamera<PerspectiveCamera>()

  return (
    <ECS.Entity>
      <ECS.Component name="camera" data={{ offset }} />

      <ECS.Component name="transform">
        <T.Group position={offset}>
          <T.PerspectiveCamera ref={camera} />
        </T.Group>
      </ECS.Component>
    </ECS.Entity>
  )
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
