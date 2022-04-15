import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { debugStyles } from "./styles"

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

const panelDefaults = css({
  position: "absolute"
})

type PanelProps = AnchorProps

export const Panel = styled.div<PanelProps>(
  panelDefaults,
  (props) => anchorStyles(props),
  debugStyles()
)
