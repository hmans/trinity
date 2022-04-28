import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState
} from "react"
import * as THREE from "three"
import T from "."
import { Composer, OnWindowResize, Renderer, Ticker } from "./engine"
import { EffectPass, RenderPass, UnrealBloomPass } from "./postprocessing"
import { AdaptiveToneMappingPass } from "three/examples/jsm/postprocessing/AdaptiveToneMappingPass.js"

const RenderPipeline: FC<{
  scene: THREE.Scene
  camera: THREE.Camera
  bloom?: boolean
}> = ({ scene, camera, bloom }) => (
  <Composer>
    <RenderPass scene={scene} camera={camera} />
    {bloom && <UnrealBloomPass />}
    <EffectPass pass={AdaptiveToneMappingPass} args={[true, 256]} />

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

type ApplicationApi = {
  setScene: (scene: THREE.Scene | null) => void
  setCamera: (camera: THREE.Camera | null) => void
}

const ApplicationContext = createContext<ApplicationApi>(null!)

export const useApplication = () => useContext(ApplicationContext)

export const Application: FC<{
  children: ReactNode | ((api: ApplicationApi) => ReactNode)
}> = ({ children }) => {
  const [scene, setScene] = useNullableState<THREE.Scene>()
  const [camera, setCamera] = useNullableState<THREE.Camera>()

  return (
    <Ticker>
      <Renderer>
        {scene && camera && (
          <RenderPipeline scene={scene} camera={camera} bloom />
        )}
        {/* {scene && camera && <EventHandling scene={scene} camera={camera} />} */}

        <T.Scene ref={setScene}>
          <ApplicationContext.Provider value={{ setCamera, setScene }}>
            {children instanceof Function
              ? children({ setScene, setCamera })
              : children}
          </ApplicationContext.Provider>
        </T.Scene>
      </Renderer>
    </Ticker>
  )
}
