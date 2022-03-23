import p2, { NaiveBroadphase } from "p2-es"
import { Vector3 } from "three"
import ArchetypeSystem from "../lib/ArchetypeSystem"
import { ECS } from "../state"

const players = ECS.world.archetype("player").entities

const tmpVec3 = new Vector3()

export const AttractPickups = () => (
  <ArchetypeSystem stage="fixed" archetype={["pickup", "body", "transform"]}>
    {(entities, dt) => {
      const player = players[0]
      if (!player) return

      for (const pickup of entities) {
        const distance = tmpVec3
          .copy(player.transform!.position)
          .sub(pickup.transform.position)

        const len = distance.length()

        if (len < 20) {
          const force = distance
            .normalize()
            .multiplyScalar((1 - Math.pow(len / 20, 3)) * 30)

          pickup.body.applyForce([force.x, force.y])
        }
      }
    }}
  </ArchetypeSystem>
)
