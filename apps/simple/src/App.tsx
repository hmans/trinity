import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import T, { Application, makeInstanceComponents } from "react-trinity"
import { Object3D } from "three"

type Entity = {
  thingy: Tag
  transform: Object3D
}

const ecs = createECS<Entity>()

const Thingy = makeInstanceComponents((world) => {
  const { entities } = world

  return () => {
    for (const { transform } of entities) {
      transform.position.set(
        Math.random() * 50 - 25,
        Math.random() * 50 - 25,
        Math.random() * 50 - 25
      )
      transform.updateMatrix()
    }
  }
})

const ThingyInstances = () => {
  Thingy.useThinInstance(5000)
  return null
}

const App = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.PerspectiveCamera position={[0, 0, 50]} ref={setCamera} />

        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        <Thingy.Root countStep={110000}>
          <T.DodecahedronGeometry />
          <T.MeshStandardMaterial color="hotpink" />
        </Thingy.Root>

        <ThingyInstances />

        {/* <ecs.Collection tag="thingy" initial={10000}>
          {() => (
            <>
              <Thingy.ThinInstance />

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
        </ecs.Collection> */}
      </>
    )}
  </Application>
)

export default App
