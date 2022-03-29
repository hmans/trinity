import { render } from "@testing-library/react"
import { createRef } from "react"
import { Mesh } from "three"
import T from "../src"

describe("Reactor", () => {
  const ref = createRef<Mesh>()

  it("works", () => {
    render(<T.Mesh ref={ref} />)
    expect(ref.current).toBeInstanceOf(Mesh)
  })
})
