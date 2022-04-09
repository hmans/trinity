import { FC } from "react"
import { Element, ElementProps } from "./Element"

export const Text: FC<ElementProps & { wrap?: Boolean }> = ({
  wrap = false,
  css,
  ...props
}) => (
  <Element
    {...props}
    css={{ ...css, whiteSpace: wrap ? "normal" : "nowrap" }}
  />
)
