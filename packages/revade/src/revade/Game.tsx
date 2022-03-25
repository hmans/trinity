import T, { Engine, View } from "@hmans/trinity"
import { EnemySpawner } from "./EnemySpawner"
import { Camera } from "./entities/Camera"
import { Enemies } from "./entities/Enemies"
import { Pickups } from "./entities/Pickups"
import { Player } from "./entities/Player"
import { Sploders } from "./entities/Sploders"
import { Splosions } from "./entities/Splosions"
import { HUD } from "./HUD"
import { Level } from "./Level"
import { PhysicsWorld } from "../lib/physics2d"
import Systems from "./systems"

export const Game = () => (
  <>
    <HUD />
    <Engine>
      <View>
        <T.AmbientLight intensity={0.3} />
        <T.DirectionalLight intensity={0.2} position={[10, 10, 10]} />

        <T.Group>
          <PhysicsWorld gravity={[0, 0]}>
            <Level />
            <Player />
            <Enemies />
            <Sploders />
            <Splosions />
            <Pickups />
            <Camera />

            <EnemySpawner />

            <Systems />
          </PhysicsWorld>
        </T.Group>
      </View>
    </Engine>
  </>
)
