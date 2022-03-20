import T, { Engine, View } from "@hmans/trinity"
import { Enemies } from "./entities/Enemies"
import { HUD } from "./HUD"
import { PhysicsWorld } from "./lib/physics2d"
import { Player } from "./entities/Player"
import Systems from "./systems"
import { Camera } from "./entities/Camera"
import { Sploders } from "./entities/Sploders"

export const Game = () => (
  <>
    <HUD />
    <Engine>
      <Systems />

      <View>
        <T.AmbientLight intensity={0.3} />
        <T.DirectionalLight intensity={0.2} position={[10, 10, 10]} />

        <T.GridHelper
          rotation={[Math.PI / 2, 0.1, 0]}
          args={[1024, 256, "#333", "#333"]}
        />

        <PhysicsWorld gravity={[0, 0]}>
          <Player />
          <Enemies />
          <Sploders />
          <Camera />
        </PhysicsWorld>
      </View>
    </Engine>
  </>
)
