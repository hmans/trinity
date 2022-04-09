import { animate, AnimationOptions } from "popmotion"
import { FC, useEffect } from "react"

export const Animation: FC<AnimationOptions<number> & {
  children?: (v: number) => void
}> = ({ children, ...props }) => {
  useEffect(() => {
    const playback = animate({ onUpdate: children, ...props })
    return () => playback.stop()
  }, [])

  return null
}
