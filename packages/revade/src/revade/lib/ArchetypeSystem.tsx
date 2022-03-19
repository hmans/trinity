import { Callback } from "@hmans/trinity"
import { TickerStage } from "@hmans/trinity/src/engine/Ticker"
import { QueriedEntity, Query } from "miniplex"
import { ECS, Entity } from "../state"

const ArchetypeSystem = <Q extends Query<Entity>>({
  archetype,
  stage = "update",
  children
}: {
  archetype: Q
  stage?: TickerStage
  children: (entities: QueriedEntity<Entity, Q>[], dt: number) => void
}) => {
  const { entities } = ECS.world.archetype(...archetype)

  return (
    <Callback stage={stage}>{(dt: number) => children(entities, dt)}</Callback>
  )
}

export default ArchetypeSystem
