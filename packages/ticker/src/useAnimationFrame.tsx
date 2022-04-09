import { useLayoutEffect } from "react"

export const useAnimationFrame = (fn: Function) =>
  useLayoutEffect(() => {
    let looping = true

    const tick = (time: DOMHighResTimeStamp) => {
      fn(time)
      if (looping) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)

    return () => {
      looping = false
    }
  }, [fn])
