import T, { useTicker } from "@hmans/trinity"
import React, { useEffect, useRef } from "react"
import { Mesh } from "three"
import { GameFSM } from "./Game"

const MenuOrb = ({ speed = 1.5 }) => {
  const ref = useRef<Mesh>(null!)

  useEffect(() => {
    console.log(GameFSM)
    setTimeout(() => {
      GameFSM.transition("startGame")
    }, 1000)
  }, [])

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

export const Menu = () => <MenuOrb />
