import React, {
  createContext,
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import { Camera, PerspectiveCamera, Scene, TextureLoader, Vector2 } from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader"
import { TechnicolorShader } from "three/examples/jsm/shaders/TechnicolorShader"
import { VerticalTiltShiftShader } from "three/examples/jsm/shaders/VerticalTiltShiftShader"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader"
import { useConst } from "@hmans/react-toolbox"
import { useRenderer } from "./Renderer"
import { Update, useTicker } from "../ticker"
import { useWindowResizeHandler } from "./useWindowResizeHandler"
import { LensDirtShader } from "../experiments/LensDirtShader"
import { ParentContext } from "../reactor"
import { EventHandling } from "./EventHandling"
import { OnWindowResize } from "./OnWindowResize"

export const View: FC<{
  scene: MutableRefObject<Scene>
  camera: MutableRefObject<Camera>
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

        if (camera.current instanceof PerspectiveCamera) {
          camera.current.aspect = width / height
          camera.current.updateProjectionMatrix()
        }
      }}
    </OnWindowResize>
  </>
)

// type ViewAPI = {
//   setCamera: (camera: Camera) => void
// }

// const ViewContext = createContext<ViewAPI>(null!)

// export const View: FC<{
//   children?: ReactNode
//   clearColor?: boolean
//   clearDepth?: boolean
//   clearStencil?: boolean
// }> = ({ children, clearColor, clearDepth, clearStencil }) => {
//   const renderer = useRenderer()
//   const composer = useMemo(() => new EffectComposer(renderer), [renderer])
//   const scene = useConst(() => new Scene())
//   const [camera, setCamera] = useState<Camera>()

//   useEffect(() => {
//     if (!renderer || !camera) return

//     /* Render */
//     composer.addPass(new RenderPass(scene, camera))

//     /* Bloom */
//     composer.addPass(new UnrealBloomPass(new Vector2(256, 256), 1.5, 0.8, 0.3))

//     // composer.addPass(new ShaderPass(LuminosityShader))
//     const dirt = new ShaderPass(LensDirtShader)
//     dirt.uniforms["tDirt"].value = new TextureLoader().load(
//       "/textures/dirt01.png"
//     )
//     dirt.uniforms["strength"].value = 0.5
//     composer.addPass(dirt)

//     /* Vignette */
//     const vignette = new ShaderPass(VignetteShader)
//     vignette.uniforms["offset"].value = 0.5
//     vignette.uniforms["darkness"].value = 2
//     composer.addPass(vignette)
//   }, [composer])

//   useTicker("render", () => {
//     clearColor && renderer.clearColor()
//     clearDepth && renderer.clearDepth()
//     clearStencil && renderer.clearStencil()

//     composer.render()
//   })

//   const api = useMemo(
//     () => ({
//       setCamera
//     }),
//     []
//   )

//   useWindowResizeHandler(() => {
//     const width = window.innerWidth
//     const height = window.innerHeight

//     if (camera instanceof PerspectiveCamera) {
//       camera.aspect = width / height
//       camera.updateProjectionMatrix()
//     }
//   }, [camera])

//   return (
//     <ViewContext.Provider value={api}>
//       <ParentContext.Provider value={scene}>{children}</ParentContext.Provider>
//     </ViewContext.Provider>
//   )
// }

// export const useView = () => useContext(ViewContext)
