import { render } from "@testing-library/react"
import { Ticker } from "./Ticker"
import React from "react"

describe("<Ticker>", () => {
  it("does not end the world", () => {
    render(<Ticker />)
  })
})
