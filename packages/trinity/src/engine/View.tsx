import React, { FC } from "react"
import { useConst } from "../lib/useConst"
import { useTicker } from "./Ticker"
import * as THREE from "three"
import { useRenderer } from "./Renderer"
import { ParentContext } from "./useParent"

export const View: FC<{ clearColor?: boolean; clearDepth?: boolean; clearStencil?: boolean }> = ({
  children,
  clearColor,
  clearDepth,
  clearStencil
}) => {
  const renderer = useRenderer()

  const scene = useConst(() => new THREE.Scene())

  const camera = useConst(() => {
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

  return <ParentContext.Provider value={scene}>{children}</ParentContext.Provider>
}
