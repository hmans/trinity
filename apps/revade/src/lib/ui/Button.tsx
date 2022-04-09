import { CSSProperties, FC } from "react"
import { Element, ElementProps } from "./Element"

const styles: CSSProperties = {
  cursor: "pointer"
}

export const Button: FC<ElementProps> = ({ ...props }) => (
  <Element {...styles} {...props} tagName="button"></Element>
)
