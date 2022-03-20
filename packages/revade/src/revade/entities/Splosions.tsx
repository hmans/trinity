import { makeInstanceComponents } from "@hmans/trinity"
import { ECS } from "../state"
import T from "@hmans/trinity"
import { useEffect } from "react"
import { animate, easeIn, easeInOut, easeOut } from "popmotion"

const Splosion = makeInstanceComponents()

export const Splosions = () => (
  <>
    <Splosion.Root>
      <T.SphereGeometry />
      <T.MeshBasicMaterial color="yellow" />
    </Splosion.Root>

    <ECS.Collection tag="splosion" initial={1} memoize>
      {(entity) => {
        useEffect(() => {
          animate({
            to: [10, 15, 0],
            ease: [easeOut, easeIn],
            offset: [0, 0.1, 1],
            duration: 2000,
            onUpdate: (latest) => entity.transform?.scale.setScalar(latest)
          })
        }, [])
        return (
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
        )
      }}
    </ECS.Collection>
  </>
)
