import System from "../lib/System"
import { tmpVector3 } from "../lib/temps"
import { ECS } from "../state"

const players = ECS.world.archetype("player", "transform")

export const Attraction = () => (
  <System archetype={["attraction", "velocity", "transform"]}>
    {(entities, dt) => {
      for (const { attraction, velocity, transform } of entities) {
        /* Find targets (for now) */
        attraction.targets = players.entities

        /* Move towards targets */
        if (attraction.targets.length) {
          const force = attraction.targets
            .reduce((acc, target) => acc.add(target.transform.position), tmpVector3.setScalar(0))
            .divideScalar(attraction.targets.length)
            .sub(transform.position)
            .normalize()
            .multiplyScalar(dt * attraction.factor)

          velocity.add(force)
        }
      }
    }}
  </System>
)
