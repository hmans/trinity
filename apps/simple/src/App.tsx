import { useState } from "react"
import T, {
  Composer,
  EventHandling,
  OnWindowResize,
  Renderer
} from "react-trinity"
import { RenderPass, UnrealBloomPass } from "react-trinity/postprocessing"
import { Ticker, Update } from "react-trinity/ticker"
import * as THREE from "three"

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
        {/* Rendering */}
        {scene && camera && (
          <Composer>
            <RenderPass scene={scene} camera={camera} />
            <UnrealBloomPass />
          </Composer>
        )}
        {/* Event handling */}
        {scene && camera && <EventHandling scene={scene} camera={camera} />}

        {/* Camera resizing */}
        {camera && (
          <OnWindowResize>
            {() => {
              const width = window.innerWidth
              const height = window.innerHeight

              if (camera instanceof THREE.PerspectiveCamera) {
                camera.aspect = width / height
                camera.updateProjectionMatrix()
              }
            }}
          </OnWindowResize>
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
