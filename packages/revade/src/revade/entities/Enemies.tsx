import THREE, { makeInstanceComponents } from "@hmans/trinity"
import { Vector3 } from "three"
import { BodyThiefHack } from "../BodyThiefHack"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../lib/physics2d/Shape"
import { tmpQuaternion } from "../lib/temps"
import { ECS } from "../state"

const Enemy = makeInstanceComponents()

const players = ECS.world.archetype("player").entities

const tmpVec3 = new Vector3()

const getSpawnPosition = (distance = 100) =>
  tmpVec3
    .randomDirection()
    .multiplyScalar(distance)
    .add(players[0]!.transform!.position)
    .clone()

export const Enemies = () => (
  <>
    <Enemy.Root>
      <THREE.SphereGeometry args={[1, 8, 8]} />
      <THREE.MeshStandardMaterial color="red" />
    </Enemy.Root>

    <ECS.Collection tag="enemy" initial={0} memoize>
      {(entity) => (
        <>
          <ECS.Component name="transform">
            <PhysicsBody
              position={getSpawnPosition()}
              linearDamping={0.8}
              angularDamping={0.8}
              fixedRotation
            >
              <BodyThiefHack />
              <CircleShape radius={1}>
                <Enemy.Instance />
              </CircleShape>
            </PhysicsBody>
          </ECS.Component>

          <ECS.Component
            name="attraction"
            data={{ factor: 2000, targets: [] }}
          />

          {/*
          <ECS.Component
            name="wobble"
            data={{ speed: between(0.5, 1.5), t: number(Math.PI * 2) }}
          />
          */}
        </>
      )}
    </ECS.Collection>
  </>
)
