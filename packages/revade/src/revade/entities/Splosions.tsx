import { makeInstanceComponents } from "@hmans/trinity"
import { ECS, Layers } from "../state"
import T from "@hmans/trinity"
import { useEffect } from "react"
import { animate, easeIn, easeInOut, easeOut } from "popmotion"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../lib/physics2d/Shape"
import { explodeEnemy } from "../actions/explodeEnemy"

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
                userData={entity}
                position={entity.spawnAt ?? [0, 0, 0]}
                scale={10}
                mass={0}
                onCollisionEnter={({ userData: other }) => {
                  if (other?.enemy) explodeEnemy(other)
                }}
              >
                <CircleShape
                  radius={15}
                  collisionGroup={Layers.Splosions}
                  collisionMask={Layers.Enemies}
                />
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
