import { Vector3 } from "three"
import ArchetypeSystem from "../lib/ArchetypeSystem"
import { ECS } from "../state"

const players = ECS.world.archetype("player", "transform")

const tmpVector3 = new Vector3()

export const Avoidance = ({ radius = 2 }) => (
  <ArchetypeSystem archetype={["avoidance", "velocity", "transform"]}>
    {(entities, dt) => {
      for (const { avoidance, velocity, transform } of entities) {
        /* Find targets (for now) */
        // avoidance.targets = spatialHashing.grid
        //   .getNearbyEntities(transform.position, radius, 10)
        //   .filter(
        //     (e) => e.transform.position.distanceTo(transform.position) <= radius
        //   )

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
