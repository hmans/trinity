import T, { makeInstanceComponents, Scene, useTicker } from "@hmans/trinity"
import { createECS } from "miniplex/react"
import { IEntity, Tag } from "miniplex"
import { Object3D } from "three"
import { number, plusMinus } from "randomish"

type Entity = {
  transform: Object3D
  bubble: Tag
  wobble: { offset: number }
} & IEntity

const ecs = createECS<Entity>()

const Bubble = makeInstanceComponents()

export const Bubbles = () => {
  const { entities } = ecs.useArchetype("transform", "wobble")

  useTicker("update", () => {
    for (const { transform, wobble } of entities) {
      transform.scale.setScalar(1 + Math.cos(wobble.offset + performance.now() / 1000) * 0.6)
    }
  })

  return (
    <>
      <T.AmbientLight intensity={0.4} />
      <T.DirectionalLight intensity={0.6} position={[10, 10, 10]} />

      <Bubble.Root>
        <T.SphereGeometry />
        <T.MeshStandardMaterial color="#666" />
      </Bubble.Root>

      <ecs.Collection tag={"bubble"} initial={1000} memoize>
        {() => (
          <>
            <ecs.Component name="transform">
              <Bubble.Instance position={[plusMinus(20), plusMinus(20), plusMinus(20)]} />
            </ecs.Component>

            <ecs.Component name="wobble" data={{ offset: number(Math.PI * 2) }} />
          </>
        )}
      </ecs.Collection>
    </>
  )
}
