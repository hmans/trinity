import { FC } from "react"
import { Element, ElementProps } from "./Element"

export const Text: FC<ElementProps & { wrap?: Boolean }> = ({
  wrap = false,
  style,
  ...props
}) => (
  <Element
    {...props}
    style={{ whiteSpace: wrap ? "normal" : "nowrap", ...style }}
  />
)
