import { render } from "@testing-library/react"
import { createRef } from "react"
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three"
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

  it("allows you to attach objects to other objects through the 'attach' prop", () => {
    const mesh = createRef<Mesh>()
    const material = createRef<MeshStandardMaterial>()

    render(
      <T.Mesh ref={mesh}>
        <T.MeshStandardMaterial
          ref={material}
          color="hotpink"
          attach="material"
        />
      </T.Mesh>
    )

    expect(mesh.current.material).toBe(material.current)
  })

  it("automatically attaches materials and geometries", () => {
    const mesh = createRef<Mesh>()
    const material = createRef<MeshStandardMaterial>()
    const geometry = createRef<BoxGeometry>()

    render(
      <T.Mesh ref={mesh}>
        <T.MeshStandardMaterial ref={material} />
        <T.BoxGeometry ref={geometry} />
      </T.Mesh>
    )

    expect(mesh.current.material).toBe(material.current)
    expect(mesh.current.geometry).toBe(geometry.current)
  })

  it("automatically attaches the object to a parent if there is one", () => {
    const parent = createRef<Mesh>()
    const child = createRef<Mesh>()

    render(
      <T.Mesh ref={parent}>
        <T.Mesh ref={child} />
      </T.Mesh>
    )

    expect(child.current.parent).toBe(parent.current)
  })
})
