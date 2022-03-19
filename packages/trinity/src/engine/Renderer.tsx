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
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas.current,
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
        stencil: false
      })

      renderer.autoClear = false

      renderer.setSize(canvas.current.clientWidth, canvas.current.clientHeight)

      return renderer
    })

    return () => void setRenderer(undefined)
  }, [canvas.current])

  useWindowResizeHandler(() => {
    if (!renderer) return
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height)
  }, [renderer])

  return (
    <canvas ref={canvas}>
      {renderer && <RendererContext.Provider value={renderer}>{children}</RendererContext.Provider>}
    </canvas>
  )
}

export const useRenderer = () => useContext(RendererContext)
