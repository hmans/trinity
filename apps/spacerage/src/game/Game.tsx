import { Suspense } from "react"
import T, { Application, FancyRenderPipeline, GLTFAsset } from "react-trinity"
import { Collider, PhysicsWorld, RigidBody } from "react-trinity/physics3d"
import { LoadingProgress } from "../lib/LoadingProgress"
import { Skybox } from "./Skybox"

export const Game = () => (
  <Suspense fallback={<p>LOADING...</p>}>
    <LoadingProgress>
      <Application renderPipeline={FancyRenderPipeline}>
        {({ setCamera }) => (
          <>
            <T.Fog args={["#000", 64, 128]} />

            <T.AmbientLight intensity={0.4} />
            <T.DirectionalLight position={[100, 300, 100]} intensity={1} />

            <Skybox />

            <PhysicsWorld gravity={[0, 0, 0]}>
              <RigidBody>
                <Collider>
                  <GLTFAsset url="/models/asteroid03.gltf" />
                </Collider>
              </RigidBody>

              <RigidBody position={[0, 0, 30]}>
                <T.PerspectiveCamera position={[0, 2, 10]} ref={setCamera} />
                <Collider rotation-x={-Math.PI / 2}>
                  <GLTFAsset url="/models/spaceship25.gltf" />
                </Collider>
              </RigidBody>
            </PhysicsWorld>
          </>
        )}
      </Application>
    </LoadingProgress>
  </Suspense>
)
