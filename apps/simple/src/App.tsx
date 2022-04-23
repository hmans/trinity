import { FC, ReactNode, useState } from "react"
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

const RenderPipeline: FC<{
  scene: THREE.Scene
  camera: THREE.Camera
}> = ({ scene, camera }) => (
  <Composer>
    <RenderPass scene={scene} camera={camera} />
    <UnrealBloomPass />

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
  </Composer>
)

function useNullableState<T>(initial?: T | (() => T)) {
  return useState<T | null>(initial!)
}

type SimpleApplicationApi = {
  setScene: (scene: THREE.Scene) => void
  setCamera: (camera: THREE.PerspectiveCamera) => void
}

const SimpleApplication: FC<{
  children: (api: SimpleApplicationApi) => ReactNode
}> = ({ children }) => {
  const [scene, setScene] = useNullableState<THREE.Scene>()
  const [camera, setCamera] = useNullableState<THREE.PerspectiveCamera>()

  return (
    <Ticker>
      <Renderer>
        {scene && camera && <RenderPipeline scene={scene} camera={camera} />}
        {scene && camera && <EventHandling scene={scene} camera={camera} />}

        <T.Scene ref={setScene}>{children({ setScene, setCamera })}</T.Scene>
      </Renderer>
    </Ticker>
  )
}

const App = () => (
  <SimpleApplication>
    {({ setCamera }) => (
      <>
        <T.PerspectiveCamera position={[0, 0, 10]} ref={setCamera} />

        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        <T.Mesh>
          <T.DodecahedronGeometry />
          <T.MeshStandardMaterial color="hotpink" />
          <AutoRotate speed={1.5} />
        </T.Mesh>
      </>
    )}
  </SimpleApplication>
)

export default App
