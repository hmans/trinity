import T, { Engine, View } from "@hmans/trinity"
import { Enemies } from "./entities/Enemies"
import { HUD } from "./HUD"
import { PhysicsWorld } from "./lib/physics2d"
import { Player } from "./entities/Player"
import Systems from "./systems"
import { Camera } from "./entities/Camera"

export const Game = () => (
  <>
    <HUD />
    <Engine>
      <Systems />

      <View>
        <T.AmbientLight />
        <T.GridHelper
          rotation={[Math.PI / 2, 0.1, 0]}
          args={[1024, 256, "#333", "#333"]}
        />

        <PhysicsWorld gravity={[0, 0]}>
          <Player />
          <Enemies />
          <Camera />
        </PhysicsWorld>
      </View>
    </Engine>
  </>
)
