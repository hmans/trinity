import ArchetypeSystem from "../lib/ArchetypeSystem"
import { tmpVector3 } from "../lib/temps"
import { ECS } from "../state"

const players = ECS.world.archetype("player", "transform")

export const Avoidance = ({ radius = 2 }) => (
  <ArchetypeSystem
    archetype={["avoidance", "velocity", "transform", "spatialHashing"]}
  >
    {(entities, dt) => {
      for (const {
        avoidance,
        velocity,
        transform,
        spatialHashing
      } of entities) {
        /* Find targets (for now) */
        avoidance.targets = spatialHashing.grid
          .getNearbyEntities(transform.position, radius, 10)
          .filter(
            (e) => e.transform.position.distanceTo(transform.position) <= radius
          )

        /* Move away from targets */
        if (avoidance.targets.length) {
          const force = avoidance.targets
            .reduce(
              (acc, target) =>
                acc.add(target.transform.position).sub(transform.position),
              tmpVector3.setScalar(0)
            )
            .divideScalar(avoidance.targets.length)
            .normalize()
            .multiplyScalar(-dt * avoidance.factor)

          velocity.add(force)
        }
      }
    }}
  </ArchetypeSystem>
)
