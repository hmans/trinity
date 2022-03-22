import { animate, AnimationOptions } from "popmotion"
import { FC, useLayoutEffect } from "react"

export const Animation: FC<
  AnimationOptions<number> & { children?: (v: number) => void }
> = ({ children, ...props }) => {
  useLayoutEffect(() => {
    animate({ onUpdate: children, ...props })
  }, [])

  return null
}
