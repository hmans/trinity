import ArchetypeSystem from "../../lib/ArchetypeSystem"

export const Lifetime = () => (
  <ArchetypeSystem archetype={["lifetime"]}>
    {(entities, dt) => {
      for (const entity of entities) {
        entity.lifetime += dt
      }
    }}
  </ArchetypeSystem>
)
