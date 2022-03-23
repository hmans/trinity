import T, { useManagedThreeObject } from "@hmans/trinity"
import { MeshStandardMaterial } from "three"
import { PhysicsBody } from "./lib/physics2d/PhsyicsBody"
import { BoxShape } from "./lib/physics2d/Shape"
import { Layers } from "./state"

export const Level = () => {
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
