import { ECS } from "./state"

export const EnemySpawner = () => (
  <ECS.Entity>
    <ECS.Component
      name="enemySpawner"
      data={{ t: 0, interval: 2, amount: 5 }}
    />
  </ECS.Entity>
)
