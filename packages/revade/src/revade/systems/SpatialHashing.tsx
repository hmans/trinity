import ArchetypeSystem from "../lib/ArchetypeSystem"

export const SpatialHashing = () => (
  <ArchetypeSystem archetype={["transform", "spatialHashing"]}>
    {(entities, dt) => {
      for (const entity of entities) {
        entity.spatialHashing.grid.placeEntity(
          entity,
          entity.transform.position
        )
      }
    }}
  </ArchetypeSystem>
)
