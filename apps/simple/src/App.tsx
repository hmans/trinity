import T, { Application, Update } from "react-trinity"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, { parent }) => (parent.rotation.x = parent.rotation.y += speed * dt)}
  </Update>
)

const App = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.PerspectiveCamera position={[0, 0, 10]} ref={setCamera} />

        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        <T.Mesh>
          <T.DodecahedronGeometry />
          <T.MeshStandardMaterial color="hotpink" />
          <AutoRotate speed={1.5} />
        </T.Mesh>
      </>
    )}
  </Application>
)

export default App
