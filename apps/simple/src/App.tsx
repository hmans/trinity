import T, { Application, makeInstanceComponents } from "react-trinity"
import { Vector3 } from "three"

/* Create components for an instanced mesh. We can pass a factory function
   returning an extra system that will get invoked every frame. */
const Thingy = makeInstanceComponents<{
  particle: {
    t: number
    factor: number
    speed: number
    xFactor: number
    yFactor: number
    zFactor: number
    mx: number
    my: number
  }
}>({
  entityFactory: () => ({
    particle: {
      t: Math.random() * 100,
      factor: 20 + Math.random() * 100,
      speed: 0.01 + Math.random() * 2,
      xFactor: -20 + Math.random() * 40,
      yFactor: -20 + Math.random() * 40,
      zFactor: -20 + Math.random() * 40,
      mx: 0,
      my: 0
    }
  }),

  systemFactory: (world) => {
    const { entities } = world.archetype("transform")

    return (dt) => {
      const l = entities.length
      const t = performance.now() / 1000

      for (let i = 0; i < l; i++) {
        const { particle, transform } = entities[i]
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle

        t = particle.t += (dt * speed) / 2

        const a = Math.cos(t) + Math.sin(t) * 0.1
        const b = Math.sin(t) + Math.cos(t * 2) * 0.1
        const s = Math.max(1.5, Math.cos(t) * 5)

        transform.position.set(
          (particle.mx / 10) * a +
            xFactor +
            Math.cos((t / 10) * factor) +
            (Math.sin(t * 1) * factor) / 10,
          (particle.my / 10) * b +
            yFactor +
            Math.sin((t / 10) * factor) +
            (Math.cos(t * 2) * factor) / 10,
          (particle.my / 10) * b +
            zFactor +
            Math.cos((t / 10) * factor) +
            (Math.sin(t * 3) * factor) / 10
        )

        transform.scale.setScalar(s)

        transform.updateMatrixWorld()
      }
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
