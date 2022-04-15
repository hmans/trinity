import { css } from "@emotion/react"

export const defaultTheme = css({
  font: "max(3vmin, 16px)/1 'Helvetica Neue'",
  button: {
    font: "inherit",
    fontWeight: "bold",
    backgroundColor: "#eee",
    border: "0.5vmin solid #888",
    padding: "1vmin 2vmin",
    borderRadius: "0.5vmin",
    cursor: "pointer",
    outline: "none",
    ":focus": {
      borderColor: "orange"
    }
  }
})
