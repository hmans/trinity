import T, { useTicker } from "@hmans/trinity"
import React, { useEffect, useRef, useState } from "react"
import { Mesh } from "three"
import { controller } from "./controller"
import { GameFSM } from "./Game"

const MenuOrb = ({ speed = 1.5 }) => {
  const ref = useRef<Mesh>(null!)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => setReady(true), 500)
  }, [])

  useTicker("update", (dt) => {
    ref.current.rotation.x = ref.current.rotation.y += speed * dt

    if (ready && controller.controls.fire.value) {
      GameFSM.transition("startGame")
    }
  })

  return (
    <T.Mesh ref={ref} scale={15}>
      <T.DodecahedronGeometry />
      <T.MeshStandardMaterial color="hotpink" />
    </T.Mesh>
  )
}

export const Menu = () => <MenuOrb />
