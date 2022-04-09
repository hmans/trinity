import { CSSProperties, FC } from "react"
import { Element, ElementProps } from "./Element"

const styles: CSSProperties = {
  cursor: "pointer"
}

type ButtonProps = {
  onClick?: Function
}

export const Button: FC<ElementProps & ButtonProps> = ({
  onClick,
  ...props
}) => <Element {...styles} {...props} tagName="button"></Element>
