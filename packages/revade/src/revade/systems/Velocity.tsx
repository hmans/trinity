import { Vector3 } from "three"
import ArchetypeSystem from "../../lib/ArchetypeSystem"

const tmpVector3 = new Vector3()

const ZERO = new Vector3()

export const Velocity = ({ damping = 4 }) => (
  <ArchetypeSystem archetype={["velocity", "transform"]}>
    {(entities, dt) => {
      for (const { velocity, transform } of entities) {
        /* Apply velocity */
        transform.position.add(tmpVector3.copy(velocity).multiplyScalar(dt))

        /* Reduce velocity */
        velocity.lerp(ZERO, 1 - Math.exp(-damping * dt))
      }
    }}
  </ArchetypeSystem>
)
