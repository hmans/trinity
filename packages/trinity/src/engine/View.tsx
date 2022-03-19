import React, { createContext, FC, useContext, useEffect, useMemo, useState } from "react"
import * as THREE from "three"
import { Camera, PerspectiveCamera, Vector2 } from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader"
import { useConst } from "../lib/useConst"
import { useRenderer } from "./Renderer"
import { useTicker } from "./Ticker"
import { ParentContext } from "./useParent"
import { useWindowResizeHandler } from "./useWindowResizeHandler"

type ViewAPI = {
  setCamera: (camera: Camera) => void
}

const ViewContext = createContext<ViewAPI>(null!)

export const View: FC<{ clearColor?: boolean; clearDepth?: boolean; clearStencil?: boolean }> = ({
  children,
  clearColor,
  clearDepth,
  clearStencil
}) => {
  const renderer = useRenderer()
  const composer = useMemo(() => new EffectComposer(renderer), [renderer])
  const scene = useConst(() => new THREE.Scene())
  const [camera, setCamera] = useState<Camera>()

  useEffect(() => {
    if (!renderer || !camera) return

    /* Render */
    composer.addPass(new RenderPass(scene, camera))

    /* Bloom */
    composer.addPass(new UnrealBloomPass(new Vector2(256, 256), 1, 0, 0.75))

    /* Film */
    composer.addPass(new FilmPass(0.3, 0, 0, 0))

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
