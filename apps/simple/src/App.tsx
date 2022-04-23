import { useState } from "react"
import T, {
  Composer,
  EventHandling,
  OnWindowResize,
  Renderer,
  RenderPass,
  Ticker,
  UnrealBloomPass,
  Update
} from "react-trinity"
import * as THREE from "three"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, { parent }) => (parent.rotation.x = parent.rotation.y += speed * dt)}
  </Update>
)

function useWire<T>(initial?: T | (() => T)) {
  const [get, set] = useState<T | null>(initial!)

  return { get, set }
}

const App = () => {
  const scene = useWire<THREE.Scene>()
  const camera = useWire<THREE.PerspectiveCamera>()

  return (
    <Ticker>
      <Renderer>
        {/* Rendering */}
        {scene.get && camera.get && (
          <Composer>
            <RenderPass scene={scene.get} camera={camera.get} />
            <UnrealBloomPass />
          </Composer>
        )}
        {/* Event handling */}
        {/* {scene.get && camera.get && (
          <EventHandling scene={scene.get} camera={camera.get} />
        )} */}

        {/* Camera resizing */}
        {camera.get && (
          <OnWindowResize>
            {() => {
              const width = window.innerWidth
              const height = window.innerHeight

              if (camera.get instanceof THREE.PerspectiveCamera) {
                camera.get.aspect = width / height
                camera.get.updateProjectionMatrix()
              }
            }}
          </OnWindowResize>
        )}

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
