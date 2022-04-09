import { FC } from "react"
import { Element, ElementProps } from "./Element"

export const Text: FC<ElementProps & { wrap?: Boolean }> = ({
  wrap = false,
  ...props
}) => <Element {...props} css={{ whiteSpace: wrap ? "normal" : "nowrap" }} />
