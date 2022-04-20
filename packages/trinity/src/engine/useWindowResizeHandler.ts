import { useEffect } from "react"

export const useWindowResizeHandler = (
  fun: (ev?: UIEvent) => void,
  deps: any[] = []
) => {
  useEffect(() => {
    /* Invoke once */
    fun()

    /* Invoke every time the window is resized */
    window.addEventListener("resize", fun, false)
    return () => void window.removeEventListener("resize", fun)
  }, [fun, ...deps])
}
