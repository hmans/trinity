import React, { FC, useEffect } from "react"
import { On } from "./On"

export const OnWindowResize: FC<{ children: Function }> = ({ children }) => {
  /* Invoke the function at least once */
  useEffect(() => children(), [])

  /* Bind it to the window's resize event */
  return <On event="resize" target={window} children={children} />
}
