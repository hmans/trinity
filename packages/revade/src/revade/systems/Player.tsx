import { VectorControl } from "@hmans/controlfreak"
import System from "../lib/System"
import { tmpVector3 } from "../lib/temps"

export const Player = ({ thrust = 10 }) => (
  <System archetype={["controller", "transform"]}>
    {(entities, dt) => {
      for (const { controller, transform } of entities) {
        controller.update()

        const move = controller.controls.move as VectorControl
        transform.position.add(
          tmpVector3.set(move.value.x * dt * thrust, move.value.y * dt * thrust, 0)
        )
      }
    }}
  </System>
)
