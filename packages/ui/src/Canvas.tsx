import { css } from "@emotion/react"
import styled from "@emotion/styled"

const fullScreen = css({
  position: "fixed",
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh"
})

const defaults = css({
  font: "18px/1 'Helvetica Neue'",
  fontWeight: "bold"
})

const noPointerEvents = css({
  pointerEvents: "none"
})

export const Canvas = styled.div(fullScreen, defaults, noPointerEvents, {
  zIndex: 100
})
