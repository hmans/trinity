import { FC, Suspense, useEffect } from "react"
import T, {
  Application,
  GLTFAsset,
  useCubeTexture,
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

const Asteroid: FC = () => (
  <Suspense>
    <GLTFAsset url="/models/asteroid03.gltf" />
  </Suspense>
)

export const Game = () => (
  <Suspense fallback={<p>LOADING...</p>}>
    <LoadingProgress>
      <Application>
        {({ setCamera }) => (
          <>
            <T.Fog args={["#000", 64, 128]} />
            <T.PerspectiveCamera position={[0, 0, 10]} ref={setCamera} />

            <T.AmbientLight intensity={0.4} />
            <T.DirectionalLight position={[100, 300, 100]} intensity={1} />

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
