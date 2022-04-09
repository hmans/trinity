import { Ticker } from "@react-trinity/ticker"
import React, { FC, ReactNode } from "react"
import { Renderer } from "./Renderer"

export const Engine: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Ticker>
      <Renderer>{children}</Renderer>
    </Ticker>
  )
}
