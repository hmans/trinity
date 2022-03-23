import T, { Engine, useManagedThreeObject, View } from "@hmans/trinity"
import { MeshStandardMaterial } from "three"
import { Camera } from "./entities/Camera"
import { Enemies } from "./entities/Enemies"
import { Player } from "./entities/Player"
import { Sploders } from "./entities/Sploders"
import { Splosions } from "./entities/Splosions"
import { HUD } from "./HUD"
import { PhysicsWorld } from "./lib/physics2d"
import { PhysicsBody } from "./lib/physics2d/PhsyicsBody"
import { BoxShape } from "./lib/physics2d/Shape"
import { ECS, Layers } from "./state"
import Systems from "./systems"

const Level = () => {
  const material = useManagedThreeObject(
    () =>
      new MeshStandardMaterial({
        color: "green",
        emissive: "green",
        emissiveIntensity: 0.7
      })
  )

  return (
    <T.Group>
      <T.GridHelper
        rotation={[Math.PI / 2, 0, 0]}
        args={[120, 20, "#333", "#333"]}
      />
      <PhysicsBody position-x={-61} mass={0}>
        <BoxShape
          size={[2, 124]}
          collisionGroup={Layers.Default}
          collisionMask={Layers.Player | Layers.Enemies}
        />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[2, 124, 2]} />
        </T.Mesh>
      </PhysicsBody>
      <PhysicsBody position-x={+61} mass={0}>
        <BoxShape
          size={[2, 124]}
          collisionGroup={Layers.Default}
          collisionMask={Layers.Player | Layers.Enemies}
        />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[2, 124, 2]} />
        </T.Mesh>
      </PhysicsBody>
      <PhysicsBody position-y={-61} mass={0}>
        <BoxShape
          size={[120, 2]}
          collisionGroup={Layers.Default}
          collisionMask={Layers.Player | Layers.Enemies}
        />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[124, 2, 2]} />
        </T.Mesh>
      </PhysicsBody>
      <PhysicsBody position-y={+61} mass={0}>
        <BoxShape
          size={[120, 2]}
          collisionGroup={Layers.Default}
          collisionMask={Layers.Player | Layers.Enemies}
        />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[124, 2, 2]} />
        </T.Mesh>
      </PhysicsBody>
    </T.Group>
  )
}

export const Game = () => (
  <>
    <HUD />
    <Engine>
      <Systems />

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
            <Camera />

            <ECS.Entity>
              <ECS.Component
                name="spawner"
                data={{ t: 0, interval: 2, amount: 5 }}
              />
            </ECS.Entity>
          </PhysicsWorld>
        </T.Group>
      </View>
    </Engine>
  </>
)
