import { CSSProperties, FC, ReactNode } from "react"

const defaultStyles: CSSProperties = {}

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

const anchorStyles: Record<Anchor, CSSProperties> = {
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

export type ElementProps = {
  children?: ReactNode
  css?: CSSProperties
  anchor?: Anchor
  debug?: boolean
}

export const Element: FC<ElementProps> = ({ children, css, anchor, debug }) => (
  <div
    style={{
      ...defaultStyles,
      ...(anchor ? anchorStyles[anchor] : {}),
      ...css
    }}
  >
    {children}
  </div>
)
