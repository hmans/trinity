import T from "@hmans/trinity"
import { ecs } from "./state"

export const Player = () => (
  <ecs.Entity>
    <ecs.Component name="player" data={true} />

    <ecs.Component name="position">
      <T.Mesh>
        <T.BoxGeometry />
        <T.MeshStandardMaterial color="orange" wireframe />
      </T.Mesh>
    </ecs.Component>
  </ecs.Entity>
)
