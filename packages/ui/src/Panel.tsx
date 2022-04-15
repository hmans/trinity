import { css } from "@emotion/react"
import styled from "@emotion/styled"

const panelDefaults = css({
  position: "absolute"
})

type AnchorProps = {
  left?: string | number | boolean
  right?: string | number | boolean
  top?: string | number | boolean
  bottom?: string | number | boolean
}

const anchorStyles = ({ left, right, top, bottom }: AnchorProps) =>
  css({
    left: typeof left === "boolean" ? "0" : left,
    right: typeof right === "boolean" ? "0" : right,
    bottom: typeof bottom === "boolean" ? "0" : bottom,
    top: typeof top === "boolean" ? "0" : top
  })

export const Panel = styled.div<AnchorProps>(panelDefaults, (props) =>
  anchorStyles(props)
)
