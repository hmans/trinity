import { VectorControl } from "@hmans/controlfreak"
import { Vec2 } from "planck"
import ArchetypeSystem from "../lib/ArchetypeSystem"

export const PlayerControl = ({ thrust = 40 }) => (
  <ArchetypeSystem archetype={["controller", "body"]}>
    {(entities, dt) => {
      for (const { controller, body } of entities) {
        controller.update()

        const move = controller.controls.move as VectorControl
        if (move.value.x || move.value.y) {
          body.applyForceToCenter(Vec2(move.value).mul(thrust), true)
        }
      }
    }}
  </ArchetypeSystem>
)
