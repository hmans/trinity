import React, { FC } from "react"
import { useConst } from "../util/useConst"
import { useTicker } from "./Ticker"
import * as THREE from "three"
import { useRenderer } from "./Renderer"
import { ParentContext } from "./useParent"

export const Scene: FC = ({ children }) => {
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
    renderer.render(scene, camera)
  })

  return <ParentContext.Provider value={scene}>{children}</ParentContext.Provider>
}
