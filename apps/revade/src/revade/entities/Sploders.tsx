import T from "@react-trinity/reactor"
import { makeInstanceComponents } from "@react-trinity/toybox"
import { PhysicsBody } from "../../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../../lib/physics2d/Shape"
import { explodeSploder } from "../actions/explodeSploder"
import { BodyThiefHack } from "../BodyThiefHack"
import { ECS, Layers } from "../state"

const Sploder = makeInstanceComponents()

export const Sploders = () => (
  <>
    <Sploder.Root>
      <T.DodecahedronGeometry />
      <T.MeshStandardMaterial
        color="#6f6"
        emissive={"#66f"}
        emissiveIntensity={0.5}
      />
    </Sploder.Root>

    <ECS.Collection tag="sploder" initial={0}>
      {(entity) => (
        <>
          <ECS.Component name="transform">
            <PhysicsBody
              userData={entity}
              position={entity.spawnAt!}
              mass={10}
              linearDamping={1}
              angularDamping={1}
            >
              <BodyThiefHack />
              <CircleShape
                radius={3}
                collisionGroup={Layers.Pickups}
                collisionMask={Layers.Player | Layers.Default}
                onBeginContact={({ userData }) => {
                  if (userData?.player) explodeSploder(entity)
                }}
              >
                <Sploder.Instance scale={3} />
              </CircleShape>
            </PhysicsBody>
          </ECS.Component>
        </>
      )}
    </ECS.Collection>
  </>
)
