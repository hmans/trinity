import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
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
import { useParent } from "react-trinity/src/reactor"
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

const SimpleApplicationContext = createContext<SimpleApplicationApi>(null!)

const useSimpleApplication = () => useContext(SimpleApplicationContext)

const SimpleApplication: FC<{
  children: ReactNode | ((api: SimpleApplicationApi) => ReactNode)
}> = ({ children }) => {
  const [scene, setScene] = useNullableState<THREE.Scene>()
  const [camera, setCamera] = useNullableState<THREE.PerspectiveCamera>()

  return (
    <Ticker>
      <Renderer>
        {scene && camera && <RenderPipeline scene={scene} camera={camera} />}
        {scene && camera && <EventHandling scene={scene} camera={camera} />}

        <T.Scene ref={setScene}>
          <SimpleApplicationContext.Provider value={{ setCamera, setScene }}>
            {children instanceof Function
              ? children({ setScene, setCamera })
              : children}
          </SimpleApplicationContext.Provider>
        </T.Scene>
      </Renderer>
    </Ticker>
  )
}

const WTF: FC<{ children: Function }> = ({ children }) => children()

const App = () => (
  <SimpleApplication>
    <T.PerspectiveCamera position={[0, 0, 10]}>
      <WTF>
        {() => {
          const { setCamera } = useSimpleApplication()
          const parent = useParent<THREE.PerspectiveCamera>()
          useEffect(() => setCamera(parent))
        }}
      </WTF>
    </T.PerspectiveCamera>

    <T.AmbientLight intensity={0.2} />
    <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

    <T.Mesh>
      <T.DodecahedronGeometry />
      <T.MeshStandardMaterial color="hotpink" />
      <AutoRotate speed={1.5} />
    </T.Mesh>
  </SimpleApplication>
)

export default App
