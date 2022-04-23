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
  const [getter, setter] = useState<T | null>(initial!)
  return { out: getter, in: setter }
}

const App = () => {
  const scene = useWire<THREE.Scene>()
  const camera = useWire<THREE.PerspectiveCamera>()

  return (
    <Ticker>
      <Renderer>
        {/* Rendering */}
        {scene.out && camera.out && (
          <Composer>
            <RenderPass scene={scene.out} camera={camera.out} />
            <UnrealBloomPass />
          </Composer>
        )}
        {/* Event handling */}
        {scene.out && camera.out && (
          <EventHandling scene={scene.out} camera={camera.out} />
        )}

        {/* Camera resizing */}
        {camera.out && (
          <OnWindowResize>
            {() => {
              const width = window.innerWidth
              const height = window.innerHeight

              if (camera.out instanceof THREE.PerspectiveCamera) {
                camera.out.aspect = width / height
                camera.out.updateProjectionMatrix()
              }
            }}
          </OnWindowResize>
        )}

        {/* The scene, with some objects, and a camera */}
        <T.Scene ref={scene.in}>
          <T.PerspectiveCamera position={[0, 0, 10]} ref={camera.in} />

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
