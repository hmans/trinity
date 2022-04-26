import T, { Application, makeInstanceComponents } from "react-trinity"

/* Create components for an instanced mesh. We can pass a factory function
   returning an extra system that will get invoked every frame. */
const Thingy = makeInstanceComponents((world) => {
  const { entities } = world

  return () => {
    const l = entities.length
    const t = performance.now()

    for (let i = 0; i < l; i++) {
      const { transform } = entities[i]

      transform.position.set(
        Math.cos(i + t * 0.002) * (10 + 15 * Math.cos(i / 3 + t * 0.002)),
        Math.sin(i * 10 + t * 0.001) * (10 + 15 * Math.cos(i / 5 + t * 0.002)),
        Math.cos(i * 50 + t * 0.003) * (10 + 25 * Math.sin(i / 8 + t * 0.008))
      )
      transform.updateMatrix()
    }
  }
})

const App = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.PerspectiveCamera position={[0, 0, 100]} ref={setCamera} />

        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        {/* Mount the root instancedmesh. The instances don't have to be children of this. */}
        <Thingy.Root countStep={51000}>
          <T.DodecahedronGeometry />
          <T.MeshStandardMaterial color="orange" />
        </Thingy.Root>

        {/* Spawn a (high) number of instances */}
        <Thingy.ThinInstance count={10000} />
      </>
    )}
  </Application>
)

export default App
