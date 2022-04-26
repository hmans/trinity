import T, { Application, makeInstanceComponents } from "react-trinity"

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
  Thingy.useThinInstance(10000)
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
      </>
    )}
  </Application>
)

export default App
