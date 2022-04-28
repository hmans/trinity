import T, { Application, makeInstanceComponents } from "react-trinity"
import { Vector3 } from "three"

/* Create components for an instanced mesh. We can pass a factory function
   returning an extra system that will get invoked every frame. */
const Thingy = makeInstanceComponents((world) => {
  const { entities } = world.archetype("transform")

  const origin = new Vector3()
  const local = new Vector3()

  return () => {
    const l = entities.length
    const t = performance.now() / 1000

    /* Calculate origin */
    origin.set(Math.cos(t) * 20, Math.sin(t) * 20, Math.cos(t) * 20)

    for (let i = 0; i < l; i++) {
      const { transform } = entities[i]

      local.set(
        Math.cos(t * 2 + i * 1) * 3,
        Math.sin(t * 1.5 + i * 2) * 3,
        Math.cos(t * 0.8 + i * 10) * 3
      )

      transform.position.copy(origin).add(local)
      transform.updateMatrixWorld()
    }
  }
})

const instanceCount = 1000

const App = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.Fog args={["#000", 64, 128]} />
        <T.PerspectiveCamera position={[0, 0, 100]} ref={setCamera} />

        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        {/* Mount the root instancedmesh. The instances don't have to be children of this. */}
        <Thingy.Root instanceLimit={instanceCount}>
          <T.DodecahedronGeometry />
          <T.MeshStandardMaterial color="orange" />
        </Thingy.Root>

        {/* Spawn a (high) number of instances */}
        <Thingy.ThinInstance count={instanceCount} />

        {/* <Thingy.Instance /> */}
      </>
    )}
  </Application>
)

export default App
