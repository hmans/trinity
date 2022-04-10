import { CSSProperties, FC, HTMLProps } from "react"
import { Element, ElementProps } from "./Element"

const styles: CSSProperties = {
  cursor: "pointer"
}

export const Button: FC<ElementProps & HTMLProps<"button">> = ({
  ...props
}) => <Element<"button"> style={styles} {...props} tagName="button" />
