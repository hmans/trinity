import { FC } from "react"
import { useEventListener } from "./useEventListener"

export const On: FC<{
  event: keyof HTMLElementEventMap
  target?: any
  children: Function
}> = ({ target = window, event, children }) => {
  useEventListener(target, event, children as any)

  return null
}
