import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { debugStyles } from "./styles"

type AnchorProps = {
  left?: string | number | boolean
  right?: string | number | boolean
  top?: string | number | boolean
  bottom?: string | number | boolean
  center?: boolean
  middle?: boolean
}

const anchor = (x: number | string, y: number | string) =>
  css({
    transform: `translateX(-${
      typeof x === "number" ? `${x * 100}%` : x
    }) translateY(-${typeof y === "number" ? `${y * 100}%` : y})`
  })

const centerStyles = ({ center, middle }: AnchorProps) =>
  css(
    {
      left: center ? "50%" : undefined,
      top: middle ? "50%" : undefined
    },
    anchor(center ? 0.5 : 0, middle ? 1 : 0)
  )

const anchorStyles = ({
  left,
  right,
  top,
  bottom,
  center,
  middle
}: AnchorProps) =>
  css(centerStyles({ center, middle }), {
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
