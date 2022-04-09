import { CSSProperties, FC } from "react"
import { Element, ElementProps } from "./Element"

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column"
}

export const VerticalGroup: FC<ElementProps & { gap?: number }> = ({
  gap = 0,
  css,
  ...props
}) => <Element {...props} css={{ ...css, ...styles, gap }} />
