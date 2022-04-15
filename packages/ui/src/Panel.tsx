import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { AnchorProps, anchorStyles, debugStyles } from "./styles"

const panelDefaults = css({
  position: "absolute"
})

type PanelProps = AnchorProps

export const Panel = styled.div<PanelProps>(
  panelDefaults,
  (props) => anchorStyles(props),
  debugStyles()
)
