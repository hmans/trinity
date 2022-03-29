import React, { FC } from "react"
import { Renderer } from "./Renderer"
import { Ticker } from "@react-trinity/ticker"

export const Engine: FC = ({ children }) => {
  return (
    <Ticker>
      <Renderer>{children}</Renderer>
    </Ticker>
  )
}
