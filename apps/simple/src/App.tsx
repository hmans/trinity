import { useRef } from "react"
import T, { Renderer, Scene } from "react-trinity"
import { Ticker, Update } from "react-trinity/ticker"
import * as THREE from "three"

const Thingy = ({ speed = 0.5 }) => (
  <T.Mesh>
    <T.DodecahedronGeometry />
    <T.MeshStandardMaterial color="hotpink" />

    <Update>
      {(dt, { parent }) =>
        (parent.rotation.x = parent.rotation.y += speed * dt)
      }
    </Update>
  </T.Mesh>
)

const App = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!)
  const scene = useRef<THREE.Scene>(null!)

  return (
    <Ticker>
      <Renderer>
        <Update stage="render">
          {(_, { renderer }) => {
            renderer.render(scene.current, camera.current)
          }}
        </Update>

        <Scene ref={scene}>
          <T.Color attach="background" args={["#ccc"]} />
          <T.PerspectiveCamera position={[0, 0, 10]} ref={camera} />
          <T.AmbientLight intensity={0.2} />
          <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />
          <Thingy />
        </Scene>
      </Renderer>
    </Ticker>
  )
}

export default App
