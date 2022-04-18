import { makeInstanceComponents } from "react-trinity/instancing"
import { easeOut } from "popmotion"
import { explodePlayer } from "../actions/explodePlayer"
import { BodyThiefHack } from "../BodyThiefHack"
import { Animation } from "../../lib/Animation"
import { PhysicsBody } from "../../lib/physics2d/PhsyicsBody"
import { CircleShape } from "../../lib/physics2d/Shape"
import { ECS, Layers } from "../state"
import { GameFSM } from "../GameFSM"
import THREE from "@react-trinity/reactor"

const Enemy = makeInstanceComponents()

export const Enemies = () => (
  <>
    <Enemy.Root>
      <THREE.SphereGeometry args={[1, 8, 8]} />
      <THREE.MeshStandardMaterial
        color="orange"
        emissive="orange"
        emissiveIntensity={0.3}
      />
    </Enemy.Root>

    <ECS.Collection tag="enemy" initial={0}>
      {(entity) => {
        return (
          <>
            <Animation from={0} to={1} ease={easeOut} duration={500}>
              {(v) => entity.transform!.scale.setScalar(v)}
            </Animation>

            <ECS.Component name="transform">
              <PhysicsBody
                userData={entity}
                position={entity.spawnAt!}
                linearDamping={0.99}
                angularDamping={0.8}
                scale={0}
                fixedRotation
                interpolate
              >
                <BodyThiefHack />
                <CircleShape
                  radius={1}
                  collisionGroup={Layers.Enemies}
                  collisionMask={
                    Layers.Enemies |
                    Layers.Player |
                    Layers.Splosions |
                    Layers.Default
                  }
                  onBeginContact={({ userData: other }) => {
                    if (other?.player) {
                      explodePlayer(other)
                      GameFSM.transition("gameOver")
                    }
                  }}
                >
                  <Enemy.Instance />
                </CircleShape>
              </PhysicsBody>
            </ECS.Component>

            <ECS.Component
              name="attraction"
              data={{ factor: 60, targets: [] }}
            />
          </>
        )
      }}
    </ECS.Collection>
  </>
)
