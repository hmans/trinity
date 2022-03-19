import System from "../lib/System"

export const SpatialHashing = () => (
  <System archetype={["transform", "spatialHashing"]}>
    {(entities, dt) => {
      for (const entity of entities) {
        entity.spatialHashing.grid.placeEntity(entity, entity.transform.position)
      }
    }}
  </System>
)
