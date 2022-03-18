import System from "../lib/System"
import { tmpVector3 } from "../lib/temps"

export const Velocity = () => (
  <System archetype={["velocity", "transform"]}>
    {(entities, dt) => {
      for (const { velocity, transform } of entities) {
        transform.position.add(tmpVector3.copy(velocity).multiplyScalar(dt))
      }
    }}
  </System>
)
