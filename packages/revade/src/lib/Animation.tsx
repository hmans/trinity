import { animate, AnimationOptions } from "popmotion"
import { FC, useLayoutEffect } from "react"

export const Animation: FC<
  AnimationOptions<number> & { children?: (v: number) => void }
> = ({ children, ...props }) => {
  useLayoutEffect(() => {
    const playback = animate({ onUpdate: children, ...props })
    return () => playback.stop()
  }, [])

  return null
}
