import { Suspense, useEffect, useState } from "react"
import T, { Application, useGLTF, useParent } from "react-trinity"
import { Collider, PhysicsWorld, RigidBody } from "react-trinity/physics3d"
import { CubeTexture, CubeTextureLoader, Scene } from "three"
import { LoadingProgress } from "../lib/LoadingProgress"

const useCubeTexture = (urls: string[]): CubeTexture | undefined => {
  const [texture, setTexture] = useState<CubeTexture>()

  useEffect(() => {
    if (!texture) new CubeTextureLoader().load(urls, setTexture)
  })

  return texture
}

const Skybox = () => {
  const parent = useParent() as Scene

  const cube = useCubeTexture([
    "/textures/skybox/right.png",
    "/textures/skybox/left.png",
    "/textures/skybox/top.png",
    "/textures/skybox/bottom.png",
    "/textures/skybox/front.png",
    "/textures/skybox/back.png"
  ])

  useEffect(() => {
    if (cube) parent.background = cube
  }, [cube, parent])

  return null
}

const Asteroid = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  return <T.Object3D object={gltf.scene} />
}

export const Game = () => (
  <LoadingProgress>
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
  </LoadingProgress>
)
