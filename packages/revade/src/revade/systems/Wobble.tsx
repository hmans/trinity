import System from "../lib/System"

export const Wobble = () => (
  <System archetype={["transform", "wobble"]}>
    {(entities, dt) => {
      for (const { transform, wobble } of entities) {
        wobble.t += dt

        transform.rotation.x += transform.rotation.y * wobble.speed * dt

        // const scale = 1 + Math.cos(wobble.t * wobble.speed) * 0.1
        // transform.scale.setScalar(scale)
      }
    }}
  </System>
)
