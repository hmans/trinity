import ArchetypeSystem from "../../lib/ArchetypeSystem"
import { ECS } from "../state"

export const Pickups = () => (
  <ArchetypeSystem archetype={["pickup", "lifetime", "transform"]}>
    {(entities) => {
      for (const entity of entities) {
        if (entity.lifetime >= 7) ECS.world.queue.destroyEntity(entity)

        if (entity.lifetime >= 3) {
          const isVisible = entity.lifetime % 1 > 0.5
          entity.transform.traverse((node) => (node.visible = isVisible))
        }
      }
    }}
  </ArchetypeSystem>
)
