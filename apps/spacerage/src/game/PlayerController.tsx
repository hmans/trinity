import RAPIER from "@dimforge/rapier3d-compat"
import { useEffect } from "react"
import { useTicker } from "react-trinity"
import { useRigidBody } from "react-trinity/physics3d"
import { controller } from "./controller"

export const PlayerController = () => {
  const { rigidBody } = useRigidBody()

  useEffect(() => {
    controller.start()
    return () => controller.stop()
  }, [])

  useTicker("early", () => controller.update())

  useTicker("fixed", () => {
    const move = controller.controls.move.value

    rigidBody.resetTorques(true)
    rigidBody.addTorque(new RAPIER.Vector3(-move.y, 0, -move.x), true)
  })

  return null
}
