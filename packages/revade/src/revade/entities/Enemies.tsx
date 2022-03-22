import THREE, { makeInstanceComponents } from "@hmans/trinity"
import { animate, easeIn, easeOut } from "popmotion"
import { plusMinus } from "randomish"
import { useEffect } from "react"
import { Vector3 } from "three"
import { BodyThiefHack } from "../BodyThiefHack"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../lib/physics2d/Shape"
import { tmpQuaternion } from "../lib/temps"
import { ECS } from "../state"

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
      {(entity) => {
        useEffect(() => {
          animate({
            from: 0,
            to: 1,
            ease: easeOut,
            duration: 500,
            onUpdate: (latest) => entity.transform!.scale.setScalar(latest)
          })
        }, [])

        return (
          <>
            <ECS.Component name="transform">
              <PhysicsBody
                position={getSpawnPosition()}
                linearDamping={0.99}
                angularDamping={0.8}
                fixedRotation
                interpolate
              >
                <BodyThiefHack />
                <CircleShape radius={1}>
                  <Enemy.Instance />
                </CircleShape>
              </PhysicsBody>
            </ECS.Component>

            <ECS.Component
              name="attraction"
              data={{ factor: 8000, targets: [] }}
            />

            {/*
          <ECS.Component
            name="wobble"
            data={{ speed: between(0.5, 1.5), t: number(Math.PI * 2) }}
          />
          */}
          </>
        )
      }}
    </ECS.Collection>
  </>
)
