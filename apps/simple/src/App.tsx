import T, { Scene } from "react-trinity"
import { useCamera } from "react-trinity/experiments"
import { Ticker, Update } from "react-trinity/ticker"
import { PerspectiveCamera } from "three"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, mesh) => (mesh.rotation.x = mesh.rotation.y += speed * dt)}
  </Update>
)

const Thingy = ({ speed = 0.5 }) => (
  <T.Mesh>
    <T.DodecahedronGeometry />
    <T.MeshStandardMaterial color="hotpink" />

    <AutoRotate speed={speed} />
  </T.Mesh>
)

const App = () => (
  <Ticker>
    <Scene>
      <T.PerspectiveCamera position={[0, 0, -10]} />
      <T.AmbientLight intensity={1} />
      <Thingy />
    </Scene>
  </Ticker>
)

export default App
