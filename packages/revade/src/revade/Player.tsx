import T from "@hmans/trinity"
import { controller } from "./controller"
import { DynamicBody } from "./lib/physics2d/DynamicBody"
import { ECS } from "./state"

export const Player = () => (
  <ECS.Entity>
    <ECS.Component name="player" data={true} />

    <ECS.Component name="controller" data={controller} />

    <ECS.Component name="transform">
      <DynamicBody>
        <T.Mesh>
          <T.BoxGeometry />
          <T.MeshStandardMaterial color="orange" wireframe />
        </T.Mesh>
      </DynamicBody>
    </ECS.Component>
  </ECS.Entity>
)
