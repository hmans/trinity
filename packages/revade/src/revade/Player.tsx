import T from "@hmans/trinity"
import { controller } from "./controller"
import { ecs } from "./state"

export const Player = () => (
  <ecs.Entity>
    <ecs.Component name="player" data={true} />

    <ecs.Component name="controller" data={controller} />

    <ecs.Component name="transform">
      <T.Mesh>
        <T.BoxGeometry />
        <T.MeshStandardMaterial color="orange" wireframe />
      </T.Mesh>
    </ecs.Component>
  </ecs.Entity>
)
