import { CSSProperties, FC, ReactNode } from "react"
import { Element, ElementProps } from "./Element"

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "row"
}

export const HorizontalGroup: FC<ElementProps & { gap?: number }> = ({
  gap = 0,
  css,
  ...props
}) => <Element {...props} css={{ ...css, ...styles, gap }} />
