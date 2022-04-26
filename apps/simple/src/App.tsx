import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import { useEffect } from "react"
import T, {
  Application,
  makeInstanceComponents,
  useTicker
} from "react-trinity"
import { Object3D } from "three"

const Thingy = makeInstanceComponents()

type Entity = {
  thingy: Tag
  transform: Object3D
}

const ecs = createECS<Entity>()

const RotationSystem = () => {
  const { entities } = ecs.world.archetype("transform")

  function animateInstances(dt: number) {
    for (const { transform } of entities) {
      transform.rotation.x = transform.rotation.y += 2 * dt
    }
  }

  useTicker("update", animateInstances)

  return null
}

const App = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.PerspectiveCamera position={[0, 0, 50]} ref={setCamera} />

        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        <Thingy.Root countStep={6000}>
          <T.DodecahedronGeometry />
          <T.MeshStandardMaterial color="hotpink" />
        </Thingy.Root>

        <ecs.Collection tag="thingy" initial={1000}>
          {() => (
            <>
              <ecs.Component name="transform">
                <Thingy.Instance
                  position={[
                    Math.random() * 50 - 25,
                    Math.random() * 50 - 25,
                    Math.random() * 50 - 25
                  ]}
                />
              </ecs.Component>
            </>
          )}
        </ecs.Collection>

        <RotationSystem />
      </>
    )}
  </Application>
)

export default App
