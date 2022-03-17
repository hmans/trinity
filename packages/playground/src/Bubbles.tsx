import T, { makeInstanceComponents, Scene } from "@hmans/trinity"
import { createECS } from "miniplex/react"
import { IEntity, Tag } from "miniplex"
import { Object3D } from "three"
import { plusMinus } from "randomish"

const Bubble = makeInstanceComponents()

type Entity = {
  transform: Object3D
  bubble: Tag
} & IEntity

const ecs = createECS<Entity>()

export const Bubbles = () => {
  return (
    <>
      <T.AmbientLight intensity={0.4} />
      <T.DirectionalLight intensity={0.6} position={[10, 10, 10]} />

      <Bubble.Root>
        <T.SphereGeometry />
        <T.MeshStandardMaterial color="#666" />
      </Bubble.Root>

      <ecs.Collection tag={"bubble"} initial={1000}>
        {() => (
          <ecs.Component name="transform">
            <Bubble.Instance position={[plusMinus(20), plusMinus(20), plusMinus(20)]} />
          </ecs.Component>
        )}
      </ecs.Collection>
    </>
  )
}
