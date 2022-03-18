import { Callback } from "@hmans/trinity"
import { QueriedEntity, Query } from "miniplex"
import { ECS, Entity } from "../state"

const System = <Q extends Query<Entity>>({
  archetype,
  children
}: {
  archetype: Q
  children: (entities: QueriedEntity<Entity, Q>[], dt: number) => void
}) => {
  const { entities } = ECS.world.archetype(...archetype)

  return <Callback>{(dt: number) => children(entities, dt)}</Callback>
}

export default System
