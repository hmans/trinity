import React, {
  createContext,
  FC,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react"
import { sRGBEncoding, WebGLRenderer } from "three"
import { useWindowResizeHandler } from "./useWindowResizeHandler"

const RendererContext = createContext<THREE.WebGLRenderer>(null!)

type RendererProps = { children?: ReactNode }

export const Renderer = forwardRef<WebGLRenderer, RendererProps>(
  ({ children }, ref) => {
    const canvas = useRef<HTMLCanvasElement>(null!)
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer>()

    useEffect(() => {
      if (!canvas.current) return

      setRenderer(() => {
        const renderer = new WebGLRenderer({
          canvas: canvas.current,
          powerPreference: "high-performance",
          antialias: false,
          alpha: false,
          stencil: false
        })

        renderer.autoClear = false
        renderer.setPixelRatio(1)
        renderer.outputEncoding = sRGBEncoding
        // renderer.toneMapping = THREE.ACESFilmicToneMapping
        // renderer.toneMapping = THREE.ReinhardToneMapping
        // renderer.toneMappingExposure = 1.25

        renderer.setSize(
          canvas.current.clientWidth,
          canvas.current.clientHeight
        )

        return renderer
      })

      return () => void setRenderer(undefined)
    }, [canvas.current])

    useImperativeHandle(ref, () => renderer, [renderer])

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
)

export const useRenderer = () => useContext(RendererContext)
