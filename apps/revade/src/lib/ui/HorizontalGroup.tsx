import { FC } from "react"
import { Element, ElementProps } from "./Element"

export const HorizontalGroup: FC<ElementProps> = (props) => (
  <Element {...props} display="flex" flexDirection="row" />
)
