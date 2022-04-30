import { useRef } from "react"
import T, { Application, useTicker } from "react-trinity"
import { PhysicsWorld as PhysicsWorldImpl } from "../lib/three-rapier-3d"
import { PhysicsWorld, RigidBody } from "../lib/trinity-rapier-3d"

const Scene = () => {
  const world = useRef<PhysicsWorldImpl>(null!)

  useTicker("physics", (dt) => world.current.update(dt))

  return (
    <PhysicsWorld ref={world}>
      <RigidBody>
        <T.Mesh>
          <T.DodecahedronGeometry />
          <T.MeshNormalMaterial />
        </T.Mesh>
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
