import T, { makeInstanceComponents } from "@hmans/trinity"
import { insideCircle, number } from "randomish"
import { useEffect } from "react"
import { BodyThiefHack } from "../BodyThiefHack"
import { PhysicsBody } from "../../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../../lib/physics2d/Shape"
import { ECS, Layers } from "../state"

const Pickup = makeInstanceComponents()

export const Pickups = () => (
  <>
    <Pickup.Root>
      <T.SphereGeometry args={[0.35]} />
      <T.MeshStandardMaterial color="#3c3" emissive="#3c3" />
    </Pickup.Root>

    <ECS.Collection tag="pickup">
      {(entity) => {
        useEffect(() => {
          const force = insideCircle()
          entity.body!.applyForce([force.x * 200, force.y * 200])
        }, [])

        return (
          <>
            <ECS.Component name="transform">
              <PhysicsBody
                position={entity.spawnAt}
                rotation-z={number(Math.PI * 2)}
                linearDamping={0.5}
                userData={entity}
              >
                <BodyThiefHack />

                <CircleShape
                  collisionGroup={Layers.Pickups}
                  collisionMask={Layers.Player | Layers.Default}
                >
                  <Pickup.Instance />
                </CircleShape>
              </PhysicsBody>
            </ECS.Component>
          </>
        )
      }}
    </ECS.Collection>
  </>
)
