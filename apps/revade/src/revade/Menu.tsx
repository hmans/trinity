import T from "react-trinity/reactor"
import { useTicker } from "react-trinity/ticker"
import React, { useRef } from "react"
import { Mesh } from "three"

const MenuOrb = ({ speed = 1.5 }) => {
  const ref = useRef<Mesh>(null!)

  useTicker("update", (dt) => {
    ref.current.rotation.x = ref.current.rotation.y += speed * dt
  })

  return (
    <T.Mesh ref={ref} scale={15}>
      <T.DodecahedronGeometry />
      <T.MeshStandardMaterial color="hotpink" />
    </T.Mesh>
  )
}

export const Menu = () => {
  return <MenuOrb />
}
