import { useState } from "react"
import T, { Renderer, View } from "react-trinity"
import { EffectPass } from "react-trinity/src/engine/View"
import { Ticker, Update } from "react-trinity/ticker"
import * as THREE from "three"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, { parent }) => (parent.rotation.x = parent.rotation.y += speed * dt)}
  </Update>
)

const App = () => {
  const [scene, setScene] = useState<THREE.Scene | null>()
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>()

  return (
    <Ticker>
      <Renderer>
        {/* The view actually takes care of rendering, event handling, etc. */}
        {scene && camera && (
          <View scene={scene} camera={camera}>
            <EffectPass pass={RenderPass} args={[scene, camera]} />
            <EffectPass
              pass={UnrealBloomPass}
              args={[new THREE.Vector2(256, 256), 1.5, 0.8, 0.3]}
            />
          </View>
        )}

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
      </Renderer>
    </Ticker>
  )
}

export default App
