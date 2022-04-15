import { css } from "@emotion/react"
import styled from "@emotion/styled"

const panelDefaults = css({
  position: "absolute"
})

type AlignmentProps = {
  left?: string | number | boolean
  right?: string | number | boolean
  top?: string | number | boolean
  bottom?: string | number | boolean
}

const alignmentStyles = ({ left, right, top, bottom }: AlignmentProps) =>
  css({
    left: typeof left === "boolean" ? "0" : left,
    right: typeof right === "boolean" ? "0" : right,
    bottom: typeof bottom === "boolean" ? "0" : bottom,
    top: typeof top === "boolean" ? "0" : top
  })

export const Panel = styled.div<AlignmentProps>(panelDefaults, (props) =>
  alignmentStyles(props)
)
