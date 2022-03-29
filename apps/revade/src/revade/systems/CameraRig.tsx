import { Vector3 } from "three"
import ArchetypeSystem from "../../lib/ArchetypeSystem"
import { ECS } from "../state"

const players = ECS.world.archetype("player").entities

const tmpVec3 = new Vector3()

export const CameraRig = () => (
  <ArchetypeSystem stage="lateUpdate" archetype={["camera", "transform"]}>
    {(entities) => {
      const player = players[0]
      if (!player || !player.transform) return

      for (const { camera, transform } of entities) {
        const target = tmpVec3
          .set(...camera.offset)
          .add(player.transform!.position)

        transform.position.lerp(target, 0.05)
      }
    }}
  </ArchetypeSystem>
)
