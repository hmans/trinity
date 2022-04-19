import { render } from "@testing-library/react"
import { Callback, Ticker } from "../src"
import React from "react"

describe("<Callback>", () => {
  it("does not end the world", () => {
    render(
      <Ticker>
        <Callback>{() => {}}</Callback>
      </Ticker>
    )
  })
})
