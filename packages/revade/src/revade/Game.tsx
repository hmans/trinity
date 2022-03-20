import T, { Engine, useManagedThreeObject, View } from "@hmans/trinity"
import { Enemies } from "./entities/Enemies"
import { HUD } from "./HUD"
import { PhysicsWorld } from "./lib/physics2d"
import { Player } from "./entities/Player"
import Systems from "./systems"
import { Camera } from "./entities/Camera"
import { Sploders } from "./entities/Sploders"
import { PhysicsBody } from "./lib/physics2d/PhsyicsBody"
import { BoxShape } from "./lib/physics2d/Shape"
import { Material, MeshStandardMaterial } from "three"

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
        <BoxShape size={[2, 124]} />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[2, 124, 2]} />
        </T.Mesh>
      </PhysicsBody>
      <PhysicsBody position-x={+61} mass={0}>
        <BoxShape size={[2, 124]} />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[2, 124, 2]} />
        </T.Mesh>
      </PhysicsBody>
      <PhysicsBody position-y={-61} mass={0}>
        <BoxShape size={[120, 2]} />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[124, 2, 2]} />
        </T.Mesh>
      </PhysicsBody>
      <PhysicsBody position-y={+61} mass={0}>
        <BoxShape size={[120, 2]} />
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
            <Camera />
          </PhysicsWorld>
        </T.Group>
      </View>
    </Engine>
  </>
)
