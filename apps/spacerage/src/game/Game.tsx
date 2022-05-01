import { useEffect } from "react"
import T, { Application, useGLTF, useParent } from "react-trinity"
import { Collider, PhysicsWorld, RigidBody } from "react-trinity/physics3d"
import { CubeTextureLoader, Scene } from "three"

const Skybox = () => {
  const parent = useParent() as Scene

  useEffect(() => {
    const urls = [
      "/textures/skybox/right.png",
      "/textures/skybox/left.png",
      "/textures/skybox/top.png",
      "/textures/skybox/bottom.png",
      "/textures/skybox/front.png",
      "/textures/skybox/back.png"
    ]

    const cube = new CubeTextureLoader().load(urls)

    parent.background = cube
  }, [])

  return null
}

const Asteroid = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  return <T.Object3D object={gltf.scene} />
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

        <Skybox />

        <PhysicsWorld gravity={[0, 0, 0]}>
          <RigidBody>
            <Collider>
              <Asteroid />
              <T.Mesh>
                <T.DodecahedronGeometry />
                <T.MeshNormalMaterial />
              </T.Mesh>
            </Collider>
          </RigidBody>
        </PhysicsWorld>
      </>
    )}
  </Application>
)
