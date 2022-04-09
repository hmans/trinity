import { CSSProperties, FC, ReactNode } from "react"

const defaultStyles: CSSProperties = {
  boxSizing: "border-box"
}

const debugStyles: CSSProperties = {
  backgroundColor: "rgba(200, 100, 50, 0.2)"
}

type Anchor =
  | "center"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "top-left"

const anchorStyles: Partial<Record<Anchor, CSSProperties>> = {
  top: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translate(-50%)"
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translate(-50%)"
  },
  "top-left": {
    position: "absolute",
    top: 0,
    left: 0
  }
}

export type ElementProps = CSSProperties & {
  children?: ReactNode
  css?: CSSProperties
  anchor?: Anchor
}

export const Element: FC<ElementProps & {
  tagName?: keyof JSX.IntrinsicElements
}> = ({ tagName = "div", children, css, anchor, ...props }) => {
  const Tag = tagName

  return (
    <Tag
      style={{
        ...defaultStyles,
        ...(anchor ? anchorStyles[anchor] : {}),
        ...props,
        ...css
      }}
    >
      {children}
    </Tag>
  )
}
