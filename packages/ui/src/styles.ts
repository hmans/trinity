import { css } from "@emotion/react"

export type AnchorProps = {
  left?: string | number | boolean
  right?: string | number | boolean
  top?: string | number | boolean
  bottom?: string | number | boolean
}

export const anchorStyles = ({ left, right, top, bottom }: AnchorProps) =>
  css({
    left: typeof left === "boolean" ? "0" : left,
    right: typeof right === "boolean" ? "0" : right,
    bottom: typeof bottom === "boolean" ? "0" : bottom,
    top: typeof top === "boolean" ? "0" : top
  })

export const debugStyles = (color = "green") => css({ backgroundColor: color })
