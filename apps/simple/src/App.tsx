import { useRef, useState } from "react"
import T, { Composer, Renderer, View } from "react-trinity"
import { UnrealBloomPass } from "react-trinity/postprocessing"
import { Ticker, Update } from "react-trinity/ticker"
import * as THREE from "three"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, { parent }) => (parent.rotation.x = parent.rotation.y += speed * dt)}
  </Update>
)

const useWire = <T extends any = any>(initialValue?: T) =>
  useState<T | null>(initialValue ?? null)

const App = () => {
  const [scene, setScene] = useWire<THREE.Scene>()
  const [camera, setCamera] = useWire<THREE.PerspectiveCamera>()

  return (
    <Ticker>
      <Renderer>
        <Composer>
          {/* The view actually takes care of rendering, event handling, etc. */}
          <View scene={scene} camera={camera}>
            <UnrealBloomPass />
          </View>

          {/* The scene, with some objects, and a camera */}
          <T.Scene ref={setScene}>
            <T.PerspectiveCamera position={[0, 0, 10]} ref={setCamera} />

            <T.AmbientLight intensity={0.2} />
            <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

            <T.Mesh>
              <T.DodecahedronGeometry />
              <T.MeshStandardMaterial color="hotpink" />
              <AutoRotate speed={1.5} />
            </T.Mesh>
          </T.Scene>
        </Composer>
      </Renderer>
    </Ticker>
  )
}

export default App
