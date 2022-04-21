import { render } from "@testing-library/react"
import React from "react"
import { Ticker } from "../src/engine/Ticker"

describe("<Ticker>", () => {
  it("does not end the world", () => {
    render(<Ticker />)
  })
})
