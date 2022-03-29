import { render } from "@testing-library/react"
import { Ticker } from "../src"

describe("<Ticker>", () => {
  it("does not end the world", () => {
    render(<Ticker />)
  })
})
