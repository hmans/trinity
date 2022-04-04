import { useTicker } from "@react-trinity/ticker"
import T from "@react-trinity/reactor"
import React, { useEffect, useRef, useState } from "react"
import { Mesh } from "three"
import { controller } from "./controller"
import { GameFSM } from "./Game"
import { filter, music } from "./audio"
import * as Tone from "tone"

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
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => setReady(true), 500)
  }, [])

  useEffect(() => {
    filter.frequency.rampTo(300, 2)
  }, [])

  useTicker("update", (dt) => {
    if (ready && controller.controls.fire.value) {
      GameFSM.transition("startGame")
    }
  })

  return <MenuOrb />
}
