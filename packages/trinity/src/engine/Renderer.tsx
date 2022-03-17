import React, { createContext, FC, useContext, useEffect, useRef, useState } from "react"
import * as THREE from "three"

const RendererContext = createContext<THREE.Renderer>(null!)

export const Renderer: FC = ({ children }) => {
  const canvas = useRef<HTMLCanvasElement>(null!)
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>()

  useEffect(() => {
    if (!canvas.current) return

    setRenderer(() => {
      const renderer = new THREE.WebGLRenderer({ canvas: canvas.current })
      renderer.setSize(canvas.current.clientWidth, canvas.current.clientHeight)
      return renderer
    })

    return () => void setRenderer(undefined)
  }, [canvas.current])

  return (
    <canvas ref={canvas}>
      {renderer && <RendererContext.Provider value={renderer}>{children}</RendererContext.Provider>}
    </canvas>
  )
}

export const useRenderer = () => useContext(RendererContext)
