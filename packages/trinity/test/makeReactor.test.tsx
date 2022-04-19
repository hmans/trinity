import { render } from "@testing-library/react"
import React, { createRef } from "react"
import { Mesh, BoxGeometry, MeshBasicMaterial } from "three"
import { isExportDeclaration } from "typescript"
import { makeReactor } from "../src/reactor"

const R = makeReactor({ Mesh, BoxGeometry, MeshBasicMaterial })

describe("Reactor", () => {
  it("wraps an instance of the equivalent THREE object", () => {
    const ref = createRef<Mesh>()

    render(
      <R.Mesh ref={ref}>
        <R.BoxGeometry />
        <R.MeshBasicMaterial />
      </R.Mesh>
    )

    expect(ref.current).toBeInstanceOf(Mesh)
    expect(ref.current!.material).toBeInstanceOf(MeshBasicMaterial)
    expect(ref.current!.geometry).toBeInstanceOf(BoxGeometry)
  })
})
