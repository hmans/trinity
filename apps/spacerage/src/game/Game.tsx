import RAPIER from "@dimforge/rapier3d-compat"
import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import { insideSphere } from "randomish"
import { Suspense } from "react"
import T, {
  Application,
  FancyRenderPipeline,
  GLTFAsset,
  useTicker
} from "react-trinity"
import {
  Collider,
  PhysicsWorld,
  RigidBody,
  useRigidBody
} from "react-trinity/physics3d"
import { Quaternion } from "three"
import { LoadingProgress } from "../lib/LoadingProgress"
import { controller } from "./controller"
import { Skybox } from "./Skybox"

type Entity = {
  isAsteroid: Tag
}

const ECS = createECS<Entity>()

const PlayerController = () => {
  const { rigidBody } = useRigidBody()

  useTicker("early", () => controller.update())

  useTicker("fixed", () => {
    const move = controller.controls.move.value
    console.log(move)
    rigidBody.addForce(new RAPIER.Vector3(move.x, move.y, 0), true)
  })

  return null
}

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
              <ECS.Collection tag="isAsteroid" initial={500}>
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
              </ECS.Collection>

              <RigidBody position={[0, 0, 30]}>
                <PlayerController />
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
