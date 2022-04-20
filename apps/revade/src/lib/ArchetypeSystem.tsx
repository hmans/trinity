import { Update, TickerStage } from "react-trinity/ticker"
import { EntityWith, Query } from "miniplex"
import { ECS, Entity } from "../revade/state"

const ArchetypeSystem = <Q extends Query<Entity>>({
  archetype,
  stage = "update",
  children
}: {
  archetype: Q
  stage?: TickerStage
  children: (entities: EntityWith<Entity, Q[number]>[], dt: number) => void
}) => {
  const { entities } = ECS.world.archetype(...archetype)

  return <Update stage={stage}>{(dt: number) => children(entities, dt)}</Update>
}

export default ArchetypeSystem
