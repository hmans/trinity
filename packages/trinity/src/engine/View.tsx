import React, { createContext, FC, useCallback, useContext, useMemo, useState } from "react"
import { useConst } from "../lib/useConst"
import { useTicker } from "./Ticker"
import * as THREE from "three"
import { useRenderer } from "./Renderer"
import { ParentContext } from "./useParent"
import { Camera, PerspectiveCamera } from "three"
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
  const scene = useConst(() => new THREE.Scene())

  const [camera, setCamera] = useState<Camera>(() => {
    const camera = new THREE.PerspectiveCamera(
      75,
      renderer.domElement.clientWidth / renderer.domElement.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 10
    return camera
  })

  useTicker("render", () => {
    clearColor && renderer.clearColor()
    clearDepth && renderer.clearDepth()
    clearStencil && renderer.clearStencil()
    renderer.render(scene, camera)
  })

  const api = useMemo(
    () => ({
      setCamera
    }),
    []
  )

  useWindowResizeHandler(() => {
    if (!renderer) return

    const width = renderer.domElement.clientWidth
    const height = renderer.domElement.clientHeight

    if (camera instanceof PerspectiveCamera) {
      console.log("whee", width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
  }, [renderer, renderer?.domElement, camera])

  return (
    <ViewContext.Provider value={api}>
      <ParentContext.Provider value={scene}>{children}</ParentContext.Provider>
    </ViewContext.Provider>
  )
}

export const useView = () => useContext(ViewContext)
