import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import { insideSphere } from "randomish"
import { Suspense } from "react"
import T, { Application, FancyRenderPipeline, GLTFAsset } from "react-trinity"
import { Collider, PhysicsWorld, RigidBody } from "react-trinity/physics3d"
import { Quaternion } from "three"
import { LoadingProgress } from "../lib/LoadingProgress"
import { PlayerController } from "./PlayerController"
import { Skybox } from "./Skybox"

type Entity = {
  isAsteroid: Tag
}

const ECS = createECS<Entity>()

const Asteroids = () => (
  <ECS.ManagedEntities tag="isAsteroid" initial={500}>
    {() => {
      const position = insideSphere(100)

      return (
        <RigidBody
          position={[position.x, position.y, position.z]}
          quaternion={new Quaternion().random()}
          scale={1 + Math.pow(Math.random(), 3) * 2}
        >
          <Collider>
            <GLTFAsset url="/models/asteroid03.gltf" />
          </Collider>
        </RigidBody>
      )
    }}
  </ECS.ManagedEntities>
)

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
                <T.PointLight
                  intensity={0.5}
                  decay={2}
                  distance={20}
                  position-y={3}
                />
                <T.PerspectiveCamera position={[0, 2, 10]} ref={setCamera} />
                <Collider rotation-x={-Math.PI / 2}>
                  <GLTFAsset url="/models/spaceship25.gltf" scale={0.5} />
                </Collider>
              </RigidBody>
            </PhysicsWorld>
          </>
        )}
      </Application>
    </LoadingProgress>
  </Suspense>
)
