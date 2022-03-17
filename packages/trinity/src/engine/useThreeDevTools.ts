import { useEffect } from "react"
import { Renderer, Scene } from "three"

export default (scene: Scene, renderer: Renderer) => {
  useEffect(() => {
    const devtools = (window as any).__THREE_DEVTOOLS__
    if (typeof devtools !== "undefined") {
      devtools.dispatchEvent(new CustomEvent("observe", { detail: scene }))
      devtools.dispatchEvent(new CustomEvent("observe", { detail: renderer }))
    }
  }, [scene, renderer])
}
