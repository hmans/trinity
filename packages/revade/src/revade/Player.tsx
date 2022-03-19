import T from "@hmans/trinity"
import { controller } from "./controller"
import { DynamicBody } from "./lib/physics2d/DynamicBody"
import { BoxFixture, CircleFixture, Fixture } from "./lib/physics2d/Fixture"
import { ECS } from "./state"

export const Player = () => (
  <ECS.Entity>
    <ECS.Component name="player" data={true} />

    <ECS.Component name="controller" data={controller} />

    <ECS.Component name="transform">
      <DynamicBody>
        <BoxFixture size={[0.5, 0.5]}>
          <T.Mesh>
            <T.BoxGeometry />
            <T.MeshStandardMaterial color="orange" wireframe />
          </T.Mesh>
        </BoxFixture>
      </DynamicBody>
    </ECS.Component>
  </ECS.Entity>
)
