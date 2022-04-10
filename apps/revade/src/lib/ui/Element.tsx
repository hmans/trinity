import {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  HTMLProps,
  ReactNode
} from "react"

const defaultStyles: CSSProperties = {
  boxSizing: "border-box"
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

export type ElementProps = {
  children?: ReactNode
  anchor?: Anchor
}

export function Element<T extends keyof JSX.IntrinsicElements = "div">({
  tagName: Tag = "div" as T,
  anchor,
  style = {},
  ...props
}: ElementProps &
  HTMLProps<T> & {
    tagName?: T
  }) {
  return (
    <Tag
      {...(props as any)}
      style={{
        ...defaultStyles,
        ...(anchor ? anchorStyles[anchor] : {}),
        ...style
      }}
    />
  )
}
