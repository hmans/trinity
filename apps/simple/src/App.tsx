import T, { Application, makeInstanceComponents, Update } from "react-trinity"

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
      for (const { particle, transform } of entities) {
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle

        t = particle.t += (dt * speed) / 2

        const a = Math.cos(t) + Math.sin(t) * 0.1
        const b = Math.sin(t) + Math.cos(t * 2) * 0.1
        const s = Math.max(1, Math.cos(t) * 3)

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
        <T.Color args={["#333"]} attach="background" />
        <T.Fog args={["#000", 64, 128]} />
        <T.PerspectiveCamera position={[0, 0, 100]} ref={setCamera} />

        <T.AmbientLight intensity={0.3} />

        <T.DirectionalLight
          intensity={1.3}
          position={[10, 30, 10]}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-near={0.5}
          shadow-camera-far={1500}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
        />

        <T.DirectionalLight
          intensity={1}
          position={[-10, -10, -10]}
          color="orange"
        />

        {/* Mount the root instancedmesh. The instances don't have to be children of this. */}
        <Thingy.Root
          instanceLimit={instanceCount + 100}
          castShadow
          receiveShadow
        >
          <T.SphereGeometry />
          <T.MeshStandardMaterial color="#444" />

          <Update stage="update">
            {(dt, { parent }) => {
              parent.rotation.x = parent.rotation.y += 0.2 * dt
            }}
          </Update>
        </Thingy.Root>

        {/* Spawn a (high) number of instances */}
        <Thingy.ThinInstance count={instanceCount} />

        <T.Mesh position={[0, 1, 0]} rotation-x={Math.PI}>
          <T.PlaneGeometry args={[1000, 1000]} />
          <T.MeshStandardMaterial color="hotpink" />
        </T.Mesh>
      </>
    )}
  </Application>
)

export default App
