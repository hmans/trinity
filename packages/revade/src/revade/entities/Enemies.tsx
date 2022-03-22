import THREE, { makeInstanceComponents } from "@hmans/trinity"
import { easeOut } from "popmotion"
import { plusMinus } from "randomish"
import { Vector3 } from "three"
import { explodePlayer } from "../actions/explodePlayer"
import { BodyThiefHack } from "../BodyThiefHack"
import { Animation } from "../lib/Animation"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../lib/physics2d/Shape"
import { ECS, Layers } from "../state"

const Enemy = makeInstanceComponents()

const players = ECS.world.archetype("player").entities

const tmpVec3 = new Vector3()

const getSpawnPosition = (distance = 100) => {
  tmpVec3.set(plusMinus(55), plusMinus(55), 0)

  return tmpVec3.clone()
}

export const Enemies = () => (
  <>
    <Enemy.Root>
      <THREE.SphereGeometry args={[1, 8, 8]} />
      <THREE.MeshStandardMaterial
        color="white"
        emissive="white"
        emissiveIntensity={0.3}
      />
    </Enemy.Root>

    <ECS.Collection tag="enemy" initial={0} memoize>
      {(entity) => (
        <>
          <Animation from={0} to={1} ease={easeOut} duration={500}>
            {(v) => entity.transform!.scale.setScalar(v)}
          </Animation>

          <ECS.Component name="transform">
            <PhysicsBody
              userData={entity}
              position={getSpawnPosition()}
              linearDamping={0.99}
              angularDamping={0.8}
              scale={0}
              fixedRotation
              interpolate
              onCollisionEnter={({ userData: other }) => {
                if (other?.player) explodePlayer(other)
              }}
            >
              <BodyThiefHack />
              <CircleShape
                radius={1}
                collisionGroup={Layers.Enemies}
                collisionMask={
                  Layers.Enemies |
                  Layers.Player |
                  Layers.Splosions |
                  Layers.Default
                }
              >
                <Enemy.Instance />
              </CircleShape>
            </PhysicsBody>
          </ECS.Component>

          <ECS.Component
            name="attraction"
            data={{ factor: 5000, targets: [] }}
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
