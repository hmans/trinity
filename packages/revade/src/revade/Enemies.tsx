import THREE, { makeInstanceComponents } from "@hmans/trinity"
import { between, number, plusMinus } from "randomish"
import { BodyThiefHack } from "./BodyThiefHack"
import { DynamicBody } from "./lib/physics2d/DynamicBody"
import { CircleFixture } from "./lib/physics2d/Fixture"
import { tmpQuaternion } from "./lib/temps"
import { ECS, spatialHashGrid } from "./state"

const Enemy = makeInstanceComponents()

export const Enemies = () => (
  <>
    <Enemy.Root>
      <THREE.DodecahedronBufferGeometry />
      <THREE.MeshStandardMaterial color="white" wireframe />
    </Enemy.Root>

    <ECS.Collection tag="enemy" memoize>
      {() => (
        <>
          <ECS.Component name="transform">
            <DynamicBody
              position={[plusMinus(50), plusMinus(50), 0]}
              linearDamping={1}
              angularDamping={1}
            >
              <BodyThiefHack />
              <CircleFixture radius={0.9} density={0.1}>
                <Enemy.Instance quaternion={tmpQuaternion.random()} />
              </CircleFixture>
            </DynamicBody>
          </ECS.Component>

          <ECS.Component name="attraction" data={{ factor: 20, targets: [] }} />

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
