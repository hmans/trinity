import T from "@hmans/trinity"
import { controller } from "./controller"
import { ECS } from "./state"

export const Player = () => (
  <ECS.Entity>
    <ECS.Component name="player" data={true} />

    <ECS.Component name="controller" data={controller} />

    <ECS.Component name="transform">
      <T.Mesh>
        <T.BoxGeometry />
        <T.MeshStandardMaterial color="orange" wireframe />
      </T.Mesh>
    </ECS.Component>
  </ECS.Entity>
)
