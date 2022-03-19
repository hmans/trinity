import THREE, { makeInstanceComponents } from "@hmans/trinity"
import { between, number, plusMinus } from "randomish"
import { DynamicBody } from "./lib/physics2d/DynamicBody"
import { tmpQuaternion } from "./lib/temps"
import { ECS, spatialHashGrid } from "./state"

const Enemy = makeInstanceComponents()

export const Enemies = ({ count = 100 }) => (
  <>
    <Enemy.Root>
      <THREE.DodecahedronBufferGeometry />
      <THREE.MeshStandardMaterial color="white" wireframe />
    </Enemy.Root>

    <ECS.Collection tag="enemy" initial={count} memoize>
      {() => (
        <>
          <ECS.Component name="transform">
            <DynamicBody position={[plusMinus(50), plusMinus(50), 0]}>
              <Enemy.Instance quaternion={tmpQuaternion.random()} />
            </DynamicBody>
          </ECS.Component>

          {/* <ECS.Component name="velocity">
            <THREE.Vector3 />
          </ECS.Component> */}

          {/* <ECS.Component
            name="spatialHashing"
            data={{ grid: spatialHashGrid }}
          /> */}

          {/*
          <ECS.Component
            name="wobble"
            data={{ speed: between(0.5, 1.5), t: number(Math.PI * 2) }}
          />

          <ECS.Component name="attraction" data={{ factor: 20, targets: [] }} />
          <ECS.Component name="avoidance" data={{ factor: 10, targets: [] }} />
          */}
        </>
      )}
    </ECS.Collection>
  </>
)
