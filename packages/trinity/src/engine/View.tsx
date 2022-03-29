import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import * as THREE from "three"
import { Camera, PerspectiveCamera, Vector2 } from "three"
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
import { useTicker } from "./Ticker"
import { useWindowResizeHandler } from "./useWindowResizeHandler"
import { LensDirtShader } from "../shaders/LensDirtShader"
import { ParentContext } from "@react-trinity/reactor"

type ViewAPI = {
  setCamera: (camera: Camera) => void
}

const ViewContext = createContext<ViewAPI>(null!)

export const View: FC<{
  clearColor?: boolean
  clearDepth?: boolean
  clearStencil?: boolean
}> = ({ children, clearColor, clearDepth, clearStencil }) => {
  const renderer = useRenderer()
  const composer = useMemo(() => new EffectComposer(renderer), [renderer])
  const scene = useConst(() => new THREE.Scene())
  const [camera, setCamera] = useState<Camera>()

  useEffect(() => {
    if (!renderer || !camera) return

    /* Render */
    composer.addPass(new RenderPass(scene, camera))

    // composer.addPass(new ShaderPass(TechnicolorShader))
    // composer.addPass(new ShaderPass(VerticalTiltShiftShader))

    /* Bloom */
    composer.addPass(new UnrealBloomPass(new Vector2(256, 256), 2, 0.8, 0.3))
    // composer.addPass(new BloomPass(1, 14, 4, 256))

    // composer.addPass(new ShaderPass(LuminosityShader))
    const dirt = new ShaderPass(LensDirtShader)
    dirt.uniforms["tDirt"].value = new THREE.TextureLoader().load(
      "/textures/dirt01.png"
    )
    dirt.uniforms["strength"].value = 0.5
    composer.addPass(dirt)

    /* Film */
    // composer.addPass(new FilmPass(0, 1, 1, 0))

    /* Vignette */
    const vignette = new ShaderPass(VignetteShader)
    vignette.uniforms["offset"].value = 0.5
    vignette.uniforms["darkness"].value = 2
    composer.addPass(vignette)
  }, [composer])

  useTicker("render", () => {
    clearColor && renderer.clearColor()
    clearDepth && renderer.clearDepth()
    clearStencil && renderer.clearStencil()

    composer.render()
  })

  const api = useMemo(
    () => ({
      setCamera
    }),
    []
  )

  useWindowResizeHandler(() => {
    const width = window.innerWidth
    const height = window.innerHeight

    if (camera instanceof PerspectiveCamera) {
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
  }, [camera])

  return (
    <ViewContext.Provider value={api}>
      <ParentContext.Provider value={scene}>{children}</ParentContext.Provider>
    </ViewContext.Provider>
  )
}

export const useView = () => useContext(ViewContext)
