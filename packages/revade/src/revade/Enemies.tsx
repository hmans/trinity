import THREE, { makeInstanceComponents } from "@hmans/trinity"
import { plusMinus } from "randomish"
import { ecs } from "./state"

const Enemy = makeInstanceComponents()

export const Enemies = ({ count = 100 }) => (
  <>
    <Enemy.Root>
      <THREE.DodecahedronBufferGeometry />
      <THREE.MeshStandardMaterial color="#fff" wireframe />
    </Enemy.Root>

    <ecs.Collection tag="enemy" initial={count}>
      {() => (
        <ecs.Component name="transform">
          <Enemy.Instance position={[plusMinus(50), plusMinus(50), 0]} />
        </ecs.Component>
      )}
    </ecs.Collection>
  </>
)
