import T, { Renderer, View } from "react-trinity"
import { Ticker } from "react-trinity/ticker"
import { useCamera } from "react-trinity/experiments"

const Camera = () => {
  const camera = useCamera()

  return <T.PerspectiveCamera position={[0, 0, -10]} ref={camera} />
}

function App() {
  return (
    <Ticker>
      <Renderer>
        <View>
          <Camera />

          <T.AmbientLight intensity={1} />
          <T.Mesh>
            <T.DodecahedronGeometry />
            <T.MeshStandardMaterial color="hotpink" />
          </T.Mesh>
        </View>
      </Renderer>
    </Ticker>
  )
}

export default App
