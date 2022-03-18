import { VectorControl } from "@hmans/controlfreak"
import { Vector3 } from "three"
import System from "../lib/System"

const tmpvec3 = new Vector3()

const Player = ({ thrust = 10 }) => (
  <System archetype={["controller", "transform"]}>
    {(entities, dt) => {
      for (const { controller, transform } of entities) {
        controller.update()

        const move = controller.controls.move as VectorControl
        transform.position.add(
          tmpvec3.set(move.value.x * dt * thrust, move.value.y * dt * thrust, 0)
        )
      }
    }}
  </System>
)

export default Player
