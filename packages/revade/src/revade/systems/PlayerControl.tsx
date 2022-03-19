import { VectorControl } from "@hmans/controlfreak"
import { Vec2 } from "planck"
import System from "../lib/System"
import { tmpVector3 } from "../lib/temps"

export const PlayerControl = ({ thrust = 100 }) => (
  <System archetype={["controller", "body"]}>
    {(entities, dt) => {
      for (const { controller, body } of entities) {
        controller.update()

        const move = controller.controls.move as VectorControl
        body.applyForceToCenter(Vec2(move.value).mul(40))
      }
    }}
  </System>
)
