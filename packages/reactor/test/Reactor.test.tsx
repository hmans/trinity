import { render } from "@testing-library/react"
import { createRef } from "react"
import { Mesh, MeshStandardMaterial } from "three"
import T from "../src"

describe("Reactor", () => {
  it("wraps an instance of the equivalent THREE object", () => {
    const ref = createRef<Mesh>()
    render(<T.Mesh ref={ref} />)
    expect(ref.current).toBeInstanceOf(Mesh)
  })

  it("uses the props to set attributes on the managed THREE object", () => {
    const ref = createRef<Mesh>()
    render(<T.Mesh ref={ref} position-x={5} />)
    expect(ref.current.position.x).toEqual(5)
  })

  it("provides shortcut props for Vector3 attributes", () => {
    const ref = createRef<Mesh>()
    render(<T.Mesh ref={ref} position={[1, 2, 3]} />)
    expect(ref.current.position.x).toEqual(1)
    expect(ref.current.position.y).toEqual(2)
    expect(ref.current.position.z).toEqual(3)
  })

  it("provides shortcut props for attributes that have a .setScalar method", () => {
    const ref = createRef<Mesh>()
    render(<T.Mesh ref={ref} scale={10} />)
    expect(ref.current.scale.x).toEqual(10)
    expect(ref.current.scale.y).toEqual(10)
    expect(ref.current.scale.z).toEqual(10)
  })

  it("provides shortcut props for color attributes", () => {
    const ref = createRef<MeshStandardMaterial>()
    render(<T.MeshStandardMaterial ref={ref} color="red" />)
    expect(ref.current.color.getHexString()).toEqual("ff0000")
  })
})
