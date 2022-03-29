import { ECS } from "./state"

export const EnemySpawner = () => (
  <ECS.Entity>
    <ECS.Component
      name="enemySpawner"
      data={{ t: 4, interval: 4, amount: 5 }}
    />
  </ECS.Entity>
)
