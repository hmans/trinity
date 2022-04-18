import { useTicker } from "react-trinity/ticker"
import T, { useManagedThreeObject } from "react-trinity/reactor"
import { MeshStandardMaterial } from "three"
import { useBody } from "../lib/physics2d/BodyContext"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { BoxShape } from "../lib/physics2d/Shape"
import { ECS, Layers } from "./state"
import { BodyThiefHack } from "./BodyThiefHack"

const Rotator = ({ speed = 1 }) => {
  const body = useBody()

  useTicker("fixed", (dt) => {
    body.angularVelocity = speed
  })

  return null
}

export const Level = () => {
  const material = useManagedThreeObject(
    () =>
      new MeshStandardMaterial({
        color: "hotpink",
        emissive: "hotpink",
        emissiveIntensity: 0.7
      })
  )

  return (
    <ECS.Collection tag="level" initial={1}>
      <ECS.Component name="transform">
        <PhysicsBody mass={1} rotation-z={Math.PI / 4} fixedX fixedY>
          <BodyThiefHack />
          <Rotator speed={-0.02} />

          <T.GridHelper
            rotation={[Math.PI / 2, 0, 0]}
            args={[120, 20, "#333", "#333"]}
          />

          <BoxShape
            offset={[-61, 0]}
            size={[2, 124]}
            collisionGroup={Layers.Default}
            collisionMask={Layers.Player | Layers.Enemies | Layers.Pickups}
          />
          <T.Mesh position={[-61, 0, 0]} material={material}>
            <T.BoxGeometry args={[2, 124, 2]} />
          </T.Mesh>

          <BoxShape
            offset={[+61, 0]}
            size={[2, 124]}
            collisionGroup={Layers.Default}
            collisionMask={Layers.Player | Layers.Enemies | Layers.Pickups}
          />
          <T.Mesh position={[+61, 0, 0]} material={material}>
            <T.BoxGeometry args={[2, 124, 2]} />
          </T.Mesh>

          <BoxShape
            offset={[0, -61]}
            size={[124, 2]}
            collisionGroup={Layers.Default}
            collisionMask={Layers.Player | Layers.Enemies | Layers.Pickups}
          />
          <T.Mesh position={[0, -61, 0]} material={material}>
            <T.BoxGeometry args={[124, 2, 2]} />
          </T.Mesh>

          <BoxShape
            offset={[0, +61]}
            size={[124, 2]}
            collisionGroup={Layers.Default}
            collisionMask={Layers.Player | Layers.Enemies | Layers.Pickups}
          />
          <T.Mesh position={[0, +61, 0]} material={material}>
            <T.BoxGeometry args={[124, 2, 2]} />
          </T.Mesh>
        </PhysicsBody>
      </ECS.Component>
    </ECS.Collection>
  )
}
