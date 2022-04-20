import { useRef } from "react"
import T, { Application, View } from "react-trinity"
import { useCamera } from "react-trinity/experiments"
import { Update, useTicker } from "react-trinity/ticker"
import { Mesh, PerspectiveCamera } from "three"

const Camera = () => {
  const camera = useCamera<PerspectiveCamera>()

  return <T.PerspectiveCamera position={[0, 0, -10]} ref={camera} />
}

const Thingy = ({ speed = 0.5 }) => (
  <T.Mesh>
    <T.DodecahedronGeometry />
    <T.MeshStandardMaterial color="hotpink" />

    <Update>
      {(dt, mesh) => (mesh.rotation.x = mesh.rotation.y += speed * dt)}
    </Update>
  </T.Mesh>
)

function App() {
  return (
    <Application>
      <View>
        <Camera />
        <T.AmbientLight intensity={1} />
        <Thingy />
      </View>
    </Application>
  )
}

export default App
