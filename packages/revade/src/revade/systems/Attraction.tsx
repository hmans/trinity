import { Vec2 } from "planck"
import System from "../lib/System"
import { tmpVector3 } from "../lib/temps"
import { ECS } from "../state"

const players = ECS.world.archetype("player", "transform")

export const Attraction = () => (
  <System archetype={["attraction", "transform", "body"]}>
    {(entities, dt) => {
      for (const { attraction, transform, body } of entities) {
        /* Find targets (for now) */
        attraction.targets = players.entities

        /* Move towards targets */
        if (attraction.targets.length) {
          const force = attraction.targets
            .reduce(
              (acc, target) => acc.add(target.transform.position),
              tmpVector3.setScalar(0)
            )
            .divideScalar(attraction.targets.length)
            .sub(transform.position)
            .normalize()
            .multiplyScalar(dt * attraction.factor)

          body.applyForceToCenter(Vec2(force).mul(attraction.factor))
        }
      }
    }}
  </System>
)
