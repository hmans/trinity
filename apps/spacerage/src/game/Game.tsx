import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import { insideSphere } from "randomish"
import { Suspense, useMemo } from "react"
import T, {
  Application,
  FancyRenderPipeline,
  GLTFAsset,
  makeInstancedMesh,
  useGLTF
} from "react-trinity"
import {
  BoxCollider,
  PhysicsWorld,
  RigidBody,
  SphereCollider
} from "react-trinity/physics3d"
import { Mesh, Quaternion } from "three"
import { LoadingProgress } from "../lib/LoadingProgress"
import { PlayerController } from "./PlayerController"
import { Skybox } from "./Skybox"

type Entity = {
  isAsteroid: Tag
}

const ECS = createECS<Entity>()

const useInstancedGLTF = (url: string) => {
  const gltf = useGLTF(url)
  const mesh = gltf.scene.children[0] as Mesh
  return useMemo(
    () =>
      makeInstancedMesh({ geometry: mesh.geometry, material: mesh.material }),
    [mesh]
  )
}

const Asteroids = () => {
  const Asset = useInstancedGLTF("/models/asteroid03.gltf")

  return (
    <>
      <Asset.Root />

      <ECS.ManagedEntities tag="isAsteroid" initial={500}>
        {() => {
          const position = insideSphere(100)

          return (
            <RigidBody
              position={[position.x, position.y, position.z]}
              quaternion={new Quaternion().random()}
              scale={1 + Math.pow(Math.random(), 3) * 2}
            >
              <SphereCollider>
                <Asset.Instance />
              </SphereCollider>
            </RigidBody>
          )
        }}
      </ECS.ManagedEntities>
    </>
  )
}

export const Game = () => (
  <Suspense fallback={<p>LOADING...</p>}>
    <LoadingProgress>
      <Application renderPipeline={FancyRenderPipeline}>
        {({ setCamera }) => (
          <>
            <T.Fog args={["#000", 64, 128]} />

            <T.AmbientLight intensity={0.8} />
            <T.DirectionalLight position={[100, 300, 100]} intensity={1} />

            <Skybox />

            <PhysicsWorld gravity={[0, 0, 0]}>
              <Asteroids />

              <RigidBody position={[0, 0, 130]}>
                <PlayerController />
                <T.PointLight intensity={2.5} position-y={3} />
                <T.PerspectiveCamera position={[0, 2, 10]} ref={setCamera} />
                <BoxCollider rotation-x={-Math.PI / 2}>
                  <GLTFAsset url="/models/spaceship25.gltf" scale={0.5} />
                </BoxCollider>
              </RigidBody>
            </PhysicsWorld>
          </>
        )}
      </Application>
    </LoadingProgress>
  </Suspense>
)
