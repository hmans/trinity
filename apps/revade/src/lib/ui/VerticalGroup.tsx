import { FC } from "react"
import { Element, ElementProps } from "./Element"

export const VerticalGroup: FC<ElementProps> = ({ css, style, ...props }) => (
  <Element
    {...props}
    style={{ display: "flex", flexDirection: "column", ...style }}
  />
)
