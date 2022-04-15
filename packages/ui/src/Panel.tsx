import { css } from "@emotion/react"
import styled from "@emotion/styled"

const panelDefaults = css({
  position: "absolute"
})

export const Panel = styled.div<{ foo?: boolean }>(
  panelDefaults,
  ({ foo }) => ({
    backgroundColor: foo ? "green" : "red"
  })
)
