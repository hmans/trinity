import { FC } from "react"
import { Element, ElementProps } from "./Element"

export const HorizontalGroup: FC<ElementProps> = ({ css, style, ...props }) => (
  <Element
    {...props}
    style={{ display: "flex", flexDirection: "row", ...style }}
  />
)
