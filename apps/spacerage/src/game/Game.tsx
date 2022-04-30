import { useRef } from "react"
import T, { Application, useTicker } from "react-trinity"
import { PhysicsWorld as PhysicsWorldImpl } from "../lib/three-rapier-3d"
import { PhysicsWorld, RigidBody, Collider } from "../lib/trinity-rapier-3d"

const Scene = () => {
  const world = useRef<PhysicsWorldImpl>(null!)

  useTicker("physics", (dt) => world.current.update(dt))

  return (
    <PhysicsWorld ref={world} gravity={{ x: 0, y: -1, z: 0 }}>
      <RigidBody>
        <Collider>
          <T.Mesh>
            <T.DodecahedronGeometry />
            <T.MeshNormalMaterial />
          </T.Mesh>
        </Collider>
      </RigidBody>
    </PhysicsWorld>
  )
}

export const Game = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.Color args={[0.2, 0.2, 0.2]} attach="background" />
        <T.Fog args={["#000", 64, 128]} />
        <T.PerspectiveCamera position={[0, 0, 10]} ref={setCamera} />

        <T.AmbientLight intensity={0.3} />
        <T.DirectionalLight position={[100, 300, 100]} intensity={0.7} />

        <Scene />
      </>
    )}
  </Application>
)
