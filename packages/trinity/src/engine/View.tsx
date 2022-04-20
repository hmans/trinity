import { useConst } from "@hmans/react-toolbox"
import React, {
  createContext,
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect
} from "react"
import { Camera, PerspectiveCamera, Scene, TextureLoader, Vector2 } from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader"
import { LensDirtShader } from "../experiments/LensDirtShader"
import { EffectPass } from "../postprocessing"
import { Constructor } from "../reactor"
import { Update } from "../ticker"
import { EventHandling } from "./EventHandling"
import { OnWindowResize } from "./OnWindowResize"
import { useRenderer } from "./Renderer"

const ViewContext = createContext<{ composer: EffectComposer }>(null!)

export const useView = () => useContext(ViewContext)

export const View: FC<{
  scene: Scene
  camera: Camera
  children?: ReactNode
}> = ({ scene, camera, children }) => {
  const renderer = useRenderer()
  const composer = useConst(() => new EffectComposer(renderer))

  useEffect(() => {
    if (!camera || !scene) return
    // composer.addPass(new RenderPass(scene, camera))
    // composer.addPass(new UnrealBloomPass(new Vector2(256, 256), 1.5, 0.8, 0.3))
    // const dirt = new ShaderPass(LensDirtShader)
    // dirt.uniforms["tDirt"].value = new TextureLoader().load(
    //   "/textures/dirt01.png"
    // )
    // dirt.uniforms["strength"].value = 0.5
    // composer.addPass(dirt)
    // /* Vignette */
    // const vignette = new ShaderPass(VignetteShader)
    // vignette.uniforms["offset"].value = 0.5
    // vignette.uniforms["darkness"].value = 2
    // composer.addPass(vignette)
  }, [composer, scene, camera])

  return (
    <ViewContext.Provider value={{ composer }}>
      <EventHandling scene={scene} camera={camera} />

      <OnWindowResize>
        {() => {
          const width = window.innerWidth
          const height = window.innerHeight

          if (camera instanceof PerspectiveCamera) {
            camera.aspect = width / height
            camera.updateProjectionMatrix()
          }
        }}
      </OnWindowResize>

      {children ?? <EffectPass pass={RenderPass} args={[scene, camera]} />}

      <Update stage="render">{() => composer.render()}</Update>
    </ViewContext.Provider>
  )
}
