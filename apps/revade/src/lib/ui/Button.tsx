import { CSSProperties, FC, HTMLProps } from "react"
import { Element, ElementProps } from "./Element"

const styles: CSSProperties = {
  cursor: "pointer"
}

export const Button: FC<ElementProps<"button">> = ({ ...props }) => (
  <Element style={styles} {...props} tagName="button" />
)
