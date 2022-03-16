import { Engine } from "./trinity/engine/Engine"
import T from "./trinity"

function Thingy() {
  return (
    <T.Mesh>
      <T.MeshStandardMaterial />
      <T.DodecahedronGeometry />
    </T.Mesh>
  )
}

function App() {
  return (
    <Engine>
      <Thingy />
    </Engine>
  )
}

export default App
