import T from "@react-trinity/reactor"
import { makeInstanceComponents } from "@react-trinity/toybox"
import { insideCircle, number } from "randomish"
import { useEffect } from "react"
import { PhysicsBody } from "../../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../../lib/physics2d/Shape"
import { BodyThiefHack } from "../BodyThiefHack"
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
          entity.body!.applyForce([force.x * 200, force.y * 300])
        }, [])

        return (
          <>
            <ECS.Component name="lifetime" data={0} />

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
