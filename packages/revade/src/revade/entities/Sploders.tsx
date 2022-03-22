import T, { makeInstanceComponents } from "@hmans/trinity"
import { Tag } from "miniplex"
import { BodyThiefHack } from "../BodyThiefHack"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../lib/physics2d/Shape"
import { ECS } from "../state"

const Sploder = makeInstanceComponents()

export const Sploders = () => (
  <>
    <Sploder.Root>
      <T.DodecahedronGeometry />
      <T.MeshStandardMaterial
        color="#66f"
        emissive={"#66f"}
        emissiveIntensity={0.5}
      />
    </Sploder.Root>

    <ECS.Collection tag="sploder" initial={0} memoize>
      {(entity) => (
        <>
          <ECS.Component name="transform">
            <PhysicsBody
              userData={entity}
              position={entity.spawnAt!}
              mass={10}
              linearDamping={1}
              angularDamping={1}
              onCollisionEnter={({ userData }) => {
                if (userData?.player) {
                  /* Spawn a splosion */
                  ECS.world.queue.createEntity({
                    splosion: Tag,
                    spawnAt: entity.transform?.position.clone()
                  })

                  /* And destroy myself */
                  ECS.world.queue.destroyEntity(entity)
                }
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
