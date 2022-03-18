import { VectorControl } from "@hmans/controlfreak"
import System from "../lib/System"
import { tmpVector3 } from "../lib/temps"

export const PlayerControl = ({ thrust = 100 }) => (
  <System archetype={["controller", "velocity"]}>
    {(entities, dt) => {
      for (const { controller, velocity } of entities) {
        controller.update()

        const move = controller.controls.move as VectorControl
        velocity.add(tmpVector3.set(move.value.x * dt * thrust, move.value.y * dt * thrust, 0))
      }
    }}
  </System>
)
