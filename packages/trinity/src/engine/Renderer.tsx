import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import * as THREE from "three"
import { Color } from "three"
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
        powerPreference: "high-performance",
        antialias: false,
        alpha: false,
        stencil: false
      })

      renderer.autoClear = false
      renderer.setClearColor("#222")
      renderer.setPixelRatio(1)
      renderer.outputEncoding = THREE.sRGBEncoding
      // renderer.toneMapping = THREE.ACESFilmicToneMapping
      // renderer.toneMapping = THREE.ReinhardToneMapping
      renderer.toneMappingExposure = 1.25

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
      {renderer && (
        <RendererContext.Provider value={renderer}>
          {children}
        </RendererContext.Provider>
      )}
    </canvas>
  )
}

export const useRenderer = () => useContext(RendererContext)
