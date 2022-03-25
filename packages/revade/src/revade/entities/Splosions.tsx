import T, { makeInstanceComponents } from "@hmans/trinity"
import { animate, easeIn, easeOut } from "popmotion"
import { useEffect } from "react"
import { BodyThiefHack } from "../BodyThiefHack"
import { PhysicsBody } from "../../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../../lib/physics2d/Shape"
import { ECS, Layers } from "../state"

const Splosion = makeInstanceComponents()

export const Splosions = () => (
  <>
    <Splosion.Root>
      <T.SphereGeometry />
      <T.MeshBasicMaterial color="yellow" />
    </Splosion.Root>

    <ECS.Collection tag="splosion" initial={0} memoize>
      {(entity) => {
        /* Animate explosion */
        useEffect(() => {
          animate({
            to: [10, 15, 0],
            ease: [easeOut, easeIn],
            offset: [0, 0.1, 1],
            duration: 1000,
            onUpdate: (latest) => entity.transform?.scale.setScalar(latest)
          })
        }, [])

        return (
          <>
            <ECS.Component name="transform">
              <PhysicsBody
                position={entity.spawnAt ?? [0, 0, 0]}
                userData={entity}
                scale={10}
                mass={0}
              >
                <CircleShape
                  radius={10}
                  collisionGroup={Layers.Splosions}
                  collisionMask={Layers.Enemies}
                  sensor
                />
                <BodyThiefHack />
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
