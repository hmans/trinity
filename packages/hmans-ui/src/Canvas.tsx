import { css, SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import { defaultTheme } from "./theme"

const fullScreen = css({
  position: "fixed",
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  pointerEvents: "none",
  zIndex: 100
})

export const Canvas = styled.div<{ theme?: SerializedStyles }>(
  fullScreen,
  defaultTheme,
  ({ theme }) => theme
)
