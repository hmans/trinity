import React, { createContext, FC, useContext, useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useWindowResizeHandler } from "./useWindowResizeHandler"

const RendererContext = createContext<THREE.WebGLRenderer>(null!)

export const Renderer: FC = ({ children }) => {
  const canvas = useRef<HTMLCanvasElement>(null!)
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>()

  useEffect(() => {
    if (!canvas.current) return

    setRenderer(() => {
      const renderer = new THREE.WebGLRenderer({ canvas: canvas.current })

      renderer.autoClear = false

      renderer.setSize(canvas.current.clientWidth, canvas.current.clientHeight)

      return renderer
    })

    return () => void setRenderer(undefined)
  }, [canvas.current])

  useWindowResizeHandler(() => {
    if (!renderer) return
    const width = renderer.domElement.clientWidth
    const height = renderer.domElement.clientHeight
    renderer.setSize(width, height)
  }, [renderer, renderer?.domElement])

  return (
    <canvas ref={canvas}>
      {renderer && <RendererContext.Provider value={renderer}>{children}</RendererContext.Provider>}
    </canvas>
  )
}

export const useRenderer = () => useContext(RendererContext)
