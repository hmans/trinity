import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import { useConst } from "../lib/useConst"
import { useTicker } from "./Ticker"
import * as THREE from "three"
import { useRenderer } from "./Renderer"
import { ParentContext } from "./useParent"
import { Camera, PerspectiveCamera } from "three"
import { useWindowResizeHandler } from "./useWindowResizeHandler"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"

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
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)
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
