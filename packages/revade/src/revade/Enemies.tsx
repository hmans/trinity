import THREE, { makeInstanceComponents } from "@hmans/trinity"
import { plusMinus } from "randomish"
import { ECS } from "./state"

const Enemy = makeInstanceComponents()

export const Enemies = ({ count = 100 }) => (
  <>
    <Enemy.Root>
      <THREE.DodecahedronBufferGeometry />
      <THREE.MeshStandardMaterial color="#fff" wireframe />
    </Enemy.Root>

    <ECS.Collection tag="enemy" initial={count}>
      {() => (
        <>
          <ECS.Component name="transform">
            <Enemy.Instance position={[plusMinus(50), plusMinus(50), 0]} />
          </ECS.Component>

          <ECS.Component name="velocity">
            <THREE.Vector3 />
          </ECS.Component>
        </>
      )}
    </ECS.Collection>
  </>
)
