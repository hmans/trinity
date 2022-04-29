import { useLayoutEffect } from "react"

export const useAnimationFrame = (fn: Function) =>
  useLayoutEffect(() => {
    let looping = true

    const tick = (time: DOMHighResTimeStamp) => {
      if (looping) requestAnimationFrame(tick)
      fn(time)
    }

    requestAnimationFrame(tick)

    return () => {
      looping = false
    }
  }, [fn])
