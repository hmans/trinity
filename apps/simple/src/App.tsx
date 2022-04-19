import T, { Renderer, View } from "react-trinity"
import { Ticker, useTicker } from "react-trinity/ticker"
import { useCamera } from "react-trinity/experiments"
import { Mesh, PerspectiveCamera } from "three"
import { useRef } from "react"

const Camera = () => {
  const camera = useCamera<PerspectiveCamera>()

  return <T.PerspectiveCamera position={[0, 0, -10]} ref={camera} />
}

const Thingy = ({ speed = 0.5 }) => {
  const ref = useRef<Mesh>(null!)

  useTicker("update", (dt) => {
    ref.current.rotation.x = ref.current.rotation.y += speed * dt
  })

  return (
    <T.Mesh ref={ref}>
      <T.DodecahedronGeometry />
      <T.MeshStandardMaterial color="hotpink" />
    </T.Mesh>
  )
}

function App() {
  return (
    <Ticker>
      <Renderer>
        <View>
          <Camera />
          <T.AmbientLight intensity={1} />
          <Thingy />
        </View>
      </Renderer>
    </Ticker>
  )
}

export default App
