import styled from "@emotion/styled"

export const FauxFullscreenGame = styled.div({
  position: "fixed",
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "#555"
})

export const Game = () => <FauxFullscreenGame onClick={(e) => console.log(e)} />
