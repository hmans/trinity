import { render } from "@testing-library/react"
import React, { createRef } from "react"
import { Mesh } from "three"
import { makeReactor } from "../src"

const R = makeReactor({ Mesh })

describe("Reactor", () => {
  it("wraps an instance of the equivalent THREE object", () => {
    const ref = createRef<Mesh>()
    render(<R.Mesh ref={ref} />)
    expect(ref.current).toBeInstanceOf(Mesh)
  })
})
