import { FC } from "react"
import { Element, ElementProps } from "./Element"

export const VerticalGroup: FC<ElementProps> = ({ css, ...props }) => (
  <Element {...props} display="flex" flexDirection="column" />
)
