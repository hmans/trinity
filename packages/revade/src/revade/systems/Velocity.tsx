import { Vector3 } from "three"
import System from "../lib/System"

const tmpvec3 = new Vector3()

export const Velocity = () => (
  <System archetype={["velocity", "transform"]}>
    {(entities, dt) => {
      for (const { velocity, transform } of entities) {
        transform.position.add(tmpvec3.copy(velocity).multiplyScalar(dt))
      }
    }}
  </System>
)
