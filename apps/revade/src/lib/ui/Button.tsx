import { CSSProperties, FC } from "react"
import { Element, ElementProps } from "./Element"

const styles: CSSProperties = {
  cursor: "pointer"
}

type ButtonProps = {
  onClick?: Function
}

export const Button: FC<ElementProps & ButtonProps> = ({ ...props }) => (
  <Element style={styles} {...props} tagName="button"></Element>
)
