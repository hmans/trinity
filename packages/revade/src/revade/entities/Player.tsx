import T from "@hmans/trinity"
import { BodyThiefHack } from "../BodyThiefHack"
import { controller } from "../controller"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { BoxShape } from "../lib/physics2d/Shape"
import { ECS } from "../state"

export const Player = () => (
  <ECS.Entity>
    <ECS.Component name="player" data={true} />

    <ECS.Component name="controller" data={controller} />

    <ECS.Component name="transform">
      <PhysicsBody linearDamping={0.8} angularDamping={0.8}>
        <BodyThiefHack />
        <BoxShape size={[1, 1]}>
          <T.Mesh>
            <T.BoxGeometry />
            <T.MeshStandardMaterial color="orange" wireframe />
          </T.Mesh>
        </BoxShape>
      </PhysicsBody>
    </ECS.Component>
  </ECS.Entity>
)
