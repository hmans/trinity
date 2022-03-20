import { makeInstanceComponents } from "@hmans/trinity"
import { ECS } from "../state"
import T from "@hmans/trinity"

const Splosion = makeInstanceComponents()

export const Splosions = () => (
  <>
    <Splosion.Root>
      <T.SphereGeometry />
      <T.MeshBasicMaterial color="yellow" />
    </Splosion.Root>

    <ECS.Collection tag="splosion" initial={1} memoize>
      {(entity) => (
        <>
          <ECS.Component name="transform">
            <T.Group position-x={-20} scale={10}>
              <Splosion.Instance />
            </T.Group>
          </ECS.Component>

          <ECS.Component
            name="auto"
            data={{
              delay: 2,
              callback: () => ECS.world.queue.destroyEntity(entity)
            }}
          />
        </>
      )}
    </ECS.Collection>
  </>
)
