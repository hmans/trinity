import { css, SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"

const fullScreen = css({
  position: "fixed",
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  pointerEvents: "none",
  zIndex: 100
})

const defaultTheme = css({
  font: "3vmin/1 'Helvetica Neue'",
  fontWeight: "bold"
})

export const Canvas = styled.div<{ theme?: SerializedStyles }>(
  fullScreen,
  defaultTheme,
  ({ theme }) => theme
)
