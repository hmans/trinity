import { useEffect } from "react"

export const useWindowResizeHandler = (fun: Function, deps: any[]) => {
  useEffect(() => {
    const handler = () => fun()

    window.addEventListener("resize", handler, false)
    return () => void window.removeEventListener("resize", handler)
  }, deps)

  fun()
}
