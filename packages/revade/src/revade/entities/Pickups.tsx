import T, { makeInstanceComponents } from "@hmans/trinity"
import { insideCircle, number } from "randomish"
import { useEffect } from "react"
import { BodyThiefHack } from "../BodyThiefHack"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { ECS } from "../state"

const Pickup = makeInstanceComponents()

export const Pickups = () => (
  <>
    <Pickup.Root>
      <T.BoxGeometry args={[0.5, 1, 0.5]} />
      <T.MeshBasicMaterial color="#3c3" />
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
              >
                <BodyThiefHack />
                <Pickup.Instance />
              </PhysicsBody>
            </ECS.Component>
          </>
        )
      }}
    </ECS.Collection>
  </>
)
