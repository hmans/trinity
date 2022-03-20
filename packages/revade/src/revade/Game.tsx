import T, { Engine, View } from "@hmans/trinity"
import { Enemies } from "./entities/Enemies"
import { HUD } from "./HUD"
import { PhysicsWorld } from "./lib/physics2d"
import { Player } from "./entities/Player"
import Systems from "./systems"
import { Camera } from "./entities/Camera"
import { Sploders } from "./entities/Sploders"
import { PhysicsBody } from "./lib/physics2d/PhsyicsBody"
import { BoxShape } from "./lib/physics2d/Shape"

const Level = () => (
  <T.Group rotation-z={0.5}>
    <T.GridHelper
      rotation={[Math.PI / 2, 0, 0]}
      args={[120, 20, "#333", "#333"]}
    />
    <PhysicsBody position-x={-65} mass={0}>
      <BoxShape size={[10, 140]} />
    </PhysicsBody>
    <PhysicsBody position-x={+65} mass={0}>
      <BoxShape size={[10, 140]} />
    </PhysicsBody>
    <PhysicsBody position-y={-65} mass={0}>
      <BoxShape size={[140, 10]} />
    </PhysicsBody>
    <PhysicsBody position-y={+65} mass={0}>
      <BoxShape size={[140, 10]} />
    </PhysicsBody>
  </T.Group>
)

export const Game = () => (
  <>
    <HUD />
    <Engine>
      <Systems />

      <View>
        <T.AmbientLight intensity={0.3} />
        <T.DirectionalLight intensity={0.2} position={[10, 10, 10]} />

        <PhysicsWorld gravity={[0, 0]}>
          <Level />
          <Player />
          <Enemies />
          <Sploders />
          <Camera />
        </PhysicsWorld>
      </View>
    </Engine>
  </>
)
