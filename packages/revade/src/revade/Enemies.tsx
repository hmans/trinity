import THREE, { makeInstanceComponents } from "@hmans/trinity"
import { between, number, plusMinus } from "randomish"
import { tmpQuaternion } from "./lib/temps"
import { ECS } from "./state"

const Enemy = makeInstanceComponents()

export const Enemies = ({ count = 100 }) => (
  <>
    <Enemy.Root>
      <THREE.DodecahedronBufferGeometry />
      <THREE.MeshStandardMaterial color="#fff" wireframe />
    </Enemy.Root>

    <ECS.Collection tag="enemy" initial={count} memoize>
      {() => (
        <>
          <ECS.Component name="transform">
            <Enemy.Instance
              position={[plusMinus(50), plusMinus(50), 0]}
              quaternion={tmpQuaternion.random()}
            />
          </ECS.Component>

          <ECS.Component name="velocity">
            <THREE.Vector3 />
          </ECS.Component>

          <ECS.Component name="wobble" data={{ speed: between(0.5, 3), t: number(Math.PI * 2) }} />
        </>
      )}
    </ECS.Collection>
  </>
)
