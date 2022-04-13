import { css } from "@emotion/react"
import styled from "@emotion/styled"

const fullScreen = css({
  position: "fixed",
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh"
})

const noPointerEvents = css({
  pointerEvents: "none"
})

export const Canvas = styled.div(fullScreen, noPointerEvents, {
  zIndex: 100,
  backgroundColor: "red"
})
