import { render } from "@testing-library/react"
import { Callback, Ticker } from "../src"

describe("<Callback>", () => {
  it("does not end the world", () => {
    render(
      <Ticker>
        <Callback>{() => {}}</Callback>
      </Ticker>
    )
  })
})
