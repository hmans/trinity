import ArchetypeSystem from "../lib/ArchetypeSystem"

export const AutoSystem = () => (
  <ArchetypeSystem archetype={["auto"]}>
    {(entities, dt) => {
      for (const { auto } of entities) {
        if (auto.delay > 0) {
          auto.delay -= dt

          if (auto.delay <= 0) {
            auto.callback()
          }
        }
      }
    }}
  </ArchetypeSystem>
)
