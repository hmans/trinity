import React, { FC, ReactNode } from "react"
import { Renderer } from "./engine/Renderer"
import { Ticker } from "./ticker"

type ApplicationProps = {
  children?: ReactNode
}

export const Application: FC<ApplicationProps> = ({ children }) => {
  return (
    <Ticker>
      <Renderer>{children}</Renderer>
    </Ticker>
  )
}
