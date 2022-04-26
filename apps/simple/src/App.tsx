import T, { Application, makeInstanceComponents } from "react-trinity"

/* Create components for an instanced mesh. We can pass a factory function
   returning an extra system that will get invoked every frame. */
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

const App = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.PerspectiveCamera position={[0, 0, 50]} ref={setCamera} />

        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        {/* Mount the root instancedmesh. The instances don't have to be children of this. */}
        <Thingy.Root countStep={11000}>
          <T.DodecahedronGeometry />
          <T.MeshStandardMaterial color="hotpink" />
        </Thingy.Root>

        {/* Spawn a (high) number of instances */}
        <Thingy.ThinInstance count={10000} />
      </>
    )}
  </Application>
)

export default App
