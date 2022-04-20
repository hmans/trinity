import { FC, MutableRefObject, useRef } from "react"
import T, { EventHandling, OnWindowResize, Renderer } from "react-trinity"
import { Ticker, Update } from "react-trinity/ticker"
import * as THREE from "three"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, { parent }) => (parent.rotation.x = parent.rotation.y += speed * dt)}
  </Update>
)

const View: FC<{
  scene: MutableRefObject<THREE.Scene>
  camera: MutableRefObject<THREE.Camera>
}> = ({ scene, camera }) => (
  <>
    <Update stage="render">
      {(_, { renderer }) => renderer.render(scene.current, camera.current)}
    </Update>

    <EventHandling scene={scene} camera={camera} />

    <OnWindowResize>
      {() => {
        const width = window.innerWidth
        const height = window.innerHeight

        if (camera.current instanceof THREE.PerspectiveCamera) {
          camera.current.aspect = width / height
          camera.current.updateProjectionMatrix()
        }
      }}
    </OnWindowResize>
  </>
)

const App = () => {
  const scene = useRef<THREE.Scene>(null!)
  const camera = useRef<THREE.PerspectiveCamera>(null!)

  return (
    <Ticker>
      <Renderer>
        {/* The view actually takes care of rendering, event handling, etc. */}
        <View scene={scene} camera={camera} />

        {/* The scene, with some objects, and a camera */}
        <T.Scene ref={scene}>
          <T.PerspectiveCamera position={[0, 0, 10]} ref={camera} />

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
