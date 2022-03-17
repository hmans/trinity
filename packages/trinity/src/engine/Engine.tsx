import React, { FC } from "react"
import { Renderer } from "./Renderer"
import { Ticker } from "./Ticker"

export const Engine: FC = ({ children }) => {
  return (
    <Renderer>
      <Ticker>{children}</Ticker>
    </Renderer>
  )
}
