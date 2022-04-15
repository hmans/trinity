import { css } from "@emotion/react"
import styled from "@emotion/styled"

type AnchorProps = {
  left?: string | number | boolean
  right?: string | number | boolean
  top?: string | number | boolean
  bottom?: string | number | boolean
  center?: boolean
  middle?: boolean
  anchor?: [number, number]
}

const anchorPointStyles = (x: number | string, y: number | string) =>
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
    anchorPointStyles(center ? 0.5 : 0, middle ? 0.5 : 0)
  )

const anchorStyles = ({
  left,
  right,
  top,
  bottom,
  center,
  middle,
  anchor
}: AnchorProps) =>
  css(
    centerStyles({ center, middle }),
    {
      left: typeof left === "boolean" ? "0" : left,
      right: typeof right === "boolean" ? "0" : right,
      bottom: typeof bottom === "boolean" ? "0" : bottom,
      top: typeof top === "boolean" ? "0" : top
    },
    anchor && anchorPointStyles(...anchor)
  )

const panelDefaults = css({
  position: "absolute"
})

type PanelProps = AnchorProps

export const Panel = styled.div<PanelProps>(panelDefaults, (props) =>
  anchorStyles(props)
)
