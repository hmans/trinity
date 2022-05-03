import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState
} from "react"
import { PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from "three"
import { ReactorComponentProps } from "../reactor"
import { useWindowResizeHandler } from "./useWindowResizeHandler"

const RendererContext = createContext<THREE.WebGLRenderer>(null!)

type RendererProps = ReactorComponentProps<typeof WebGLRenderer>

export const Renderer = forwardRef<WebGLRenderer, RendererProps>(
  ({ children }, ref) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>()
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>()

    useEffect(() => {
      if (!canvas) return

      setRenderer(() => {
        const renderer = new WebGLRenderer({
          canvas: canvas,
          powerPreference: "high-performance",
          antialias: true,
          alpha: false,
          stencil: false,
          logarithmicDepthBuffer: true
        })

        renderer.autoClear = false
        renderer.setPixelRatio(1)
        renderer.outputEncoding = sRGBEncoding

        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = PCFSoftShadowMap

        renderer.setSize(canvas.clientWidth, canvas.clientHeight)

        return renderer
      })

      return () => void setRenderer(undefined)
    }, [canvas])

    useImperativeHandle(ref, () => renderer!, [renderer])

    useWindowResizeHandler(() => {
      if (!renderer) return

      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height)
    }, [renderer])

    return (
      <canvas ref={setCanvas}>
        {renderer && (
          <RendererContext.Provider value={renderer}>
            {typeof children === "function" ? children() : children}
          </RendererContext.Provider>
        )}
      </canvas>
    )
  }
)

export const useRenderer = () => useContext(RendererContext)
