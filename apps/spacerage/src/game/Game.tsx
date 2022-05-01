import { Suspense } from "react"
import { FC, useEffect } from "react"
import T, {
  Application,
  useCubeTexture,
  useGLTF,
  useParent
} from "react-trinity"
import { Collider, PhysicsWorld, RigidBody } from "react-trinity/physics3d"
import { Scene } from "three"
import { LoadingProgress } from "../lib/LoadingProgress"

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

const Asteroid: FC = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  return gltf ? <T.Object3D object={gltf.scene} /> : null
}

export const Game = () => (
  <Suspense fallback={<p>LOADING...</p>}>
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
                </Collider>
              </RigidBody>
            </PhysicsWorld>
          </>
        )}
      </Application>
    </LoadingProgress>
  </Suspense>
)
