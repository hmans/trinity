import { VectorControl } from "@hmans/controlfreak"
import ArchetypeSystem from "../lib/ArchetypeSystem"

export const PlayerControl = ({ thrust = 300 }) => (
  <ArchetypeSystem stage="fixed" archetype={["controller", "body"]}>
    {(entities, dt) => {
      for (const { controller, body } of entities) {
        controller.update()

        const move = controller.controls.move as VectorControl
        if (move.value.x || move.value.y) {
          body.applyForce([move.value.x * thrust, move.value.y * thrust])
        }
      }
    }}
  </ArchetypeSystem>
)
