import { Callback } from "@hmans/trinity"
import { IEntity, QueriedEntity, Query, World } from "miniplex"

const System = <E extends IEntity, Q extends Query<E>>({
  world,
  archetype,
  children
}: {
  world: World<E>
  archetype: Q
  children: (entities: QueriedEntity<E, Q>[], dt: number) => void
}) => {
  const { entities } = world.archetype(...archetype)

  return <Callback>{(dt: number) => children(entities, dt)}</Callback>
}

export default System
