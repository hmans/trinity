import { useRef, useState } from "react"
import T, { Renderer, View } from "react-trinity"
import { UnrealBloomPass } from "react-trinity/postprocessing"
import { Ticker, Update } from "react-trinity/ticker"
import * as THREE from "three"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, { parent }) => (parent.rotation.x = parent.rotation.y += speed * dt)}
  </Update>
)

const useWire = <T extends any = any>(initialValue?: T) => {
  const [value, setValue] = useState<T | null>(initialValue ?? null)

  return {
    get: value,
    set: setValue
  }
}

const App = () => {
  const scene = useWire<THREE.Scene>()
  const camera = useWire<THREE.Camera>()

  return (
    <Ticker>
      <Renderer>
        {/* The view actually takes care of rendering, event handling, etc. */}
        <View scene={scene.get!} camera={camera.get!}>
          <UnrealBloomPass />
        </View>

        {/* The scene, with some objects, and a camera */}
        <T.Scene ref={scene.set}>
          <T.PerspectiveCamera position={[0, 0, 10]} ref={camera.set} />

          <T.AmbientLight intensity={0.2} />
          <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

          <T.Mesh>
            <T.DodecahedronGeometry />
            <T.MeshStandardMaterial color="hotpink" />
            <AutoRotate speed={1.5} />
          </T.Mesh>
        </T.Scene>
      </Renderer>
    </Ticker>
  )
}

export default App
