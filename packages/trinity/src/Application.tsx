import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState
} from "react"
import * as THREE from "three"
import { AdaptiveToneMappingPass } from "three/examples/jsm/postprocessing/AdaptiveToneMappingPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import T from "."
import { Composer, OnWindowResize, Renderer, Ticker } from "./engine"
import { EffectPass, RenderPass, Vignette } from "./postprocessing"

const RenderPipeline: FC<{
  scene: THREE.Scene
  camera: THREE.Camera
  bloom?: boolean
}> = ({ scene, camera, bloom }) => (
  <Composer>
    <RenderPass scene={scene} camera={camera} />
    <EffectPass
      pass={UnrealBloomPass}
      args={[new THREE.Vector2(256, 256), 1.5, 0.8, 0.3]}
    />
    <EffectPass pass={AdaptiveToneMappingPass} args={[true, 256]} />
    <Vignette />

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
