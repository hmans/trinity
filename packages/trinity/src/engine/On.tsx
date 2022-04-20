import { FC, useEffect } from "react"

export const On: FC<{ event: string; target?: any; children: Function }> = ({
  target = window,
  event,
  children
}) => {
  useEffect(() => {
    target.addEventListener(event, children)
    return () => target.removeEventListener(event, children)
  }, [event, target, children])

  return null
}
