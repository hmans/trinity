import { makeInstanceComponents } from "@hmans/trinity"
import { ECS } from "../state"
import T from "@hmans/trinity"
import { useEffect } from "react"
import { animate, easeIn, easeInOut, easeOut } from "popmotion"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../lib/physics2d/Shape"

const Splosion = makeInstanceComponents()

export const Splosions = () => (
  <>
    <Splosion.Root>
      <T.SphereGeometry />
      <T.MeshBasicMaterial color="yellow" />
    </Splosion.Root>

    <ECS.Collection tag="splosion" initial={0} memoize>
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
              <PhysicsBody
                position={entity.spawnAt ?? [0, 0, 0]}
                scale={10}
                mass={0}
                onCollisionEnter={(other) => {
                  /* TODO: "other" is the physics2d entity here, we need to get the game entity! */
                  console.log("Sploding:", other)
                  ECS.world.queue.destroyEntity(other)
                }}
              >
                <CircleShape radius={10} />
                <Splosion.Instance />
              </PhysicsBody>
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
