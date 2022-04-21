import React, { FC, ReactNode } from "react"
import { Renderer, Ticker } from "./engine"

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
