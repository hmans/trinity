import T, { makeInstanceComponents } from "@hmans/trinity"
import { BodyThiefHack } from "../BodyThiefHack"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../lib/physics2d/Shape"
import { ECS } from "../state"

const Sploder = makeInstanceComponents()

export const Sploders = () => (
  <>
    <Sploder.Root>
      <T.SphereGeometry />
      <T.MeshStandardMaterial color="red" wireframe />
    </Sploder.Root>

    <ECS.Collection tag="sploder" initial={1} memoize>
      {(entity) => (
        <>
          <ECS.Component name="transform">
            <PhysicsBody
              position={[0, 10, 0]}
              mass={10}
              linearDamping={1}
              angularDamping={1}
              onCollisionEnter={() => {
                // console.log("KABOOM!")
                // ECS.world.queue.destroyEntity(entity)
              }}
            >
              <BodyThiefHack />
              <CircleShape radius={3}>
                <Sploder.Instance scale={3} />
              </CircleShape>
            </PhysicsBody>
          </ECS.Component>
        </>
      )}
    </ECS.Collection>
  </>
)
