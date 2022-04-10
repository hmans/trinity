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

type TagName = keyof JSX.IntrinsicElements

export type ElementProps<T extends TagName> = {
  children?: ReactNode
  anchor?: Anchor
} & HTMLProps<T>

/* TODO: The types here can probably be improved a lot... */
export function Element<T extends TagName = "div">({
  tagName,
  anchor,
  style = {},
  ...props
}: {
  tagName?: T
} & ElementProps<T>) {
  const Tag: TagName = tagName || "div"

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
