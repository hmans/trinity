import RAPIER from "@dimforge/rapier3d-compat"
import { useEffect } from "react"
import { useTicker } from "react-trinity"
import { useRigidBody } from "react-trinity/physics3d"
import { Vector3 } from "three"
import { controller } from "./controller"

export const PlayerController = () => {
  const { rigidBody, entity } = useRigidBody()

  useEffect(() => {
    controller.start()
    return () => controller.stop()
  }, [])

  useTicker("early", () => controller.update())

  useTicker("fixed", () => {
    const move = controller.controls.move.value

    rigidBody.rawSet.rbResetTorques(rigidBody.handle, true)
    rigidBody.resetForces(true)

    rigidBody.addTorque(
      new Vector3(-move.y * 70, 0, -move.x * 200).applyQuaternion(
        entity.transform.quaternion
      ),
      true
    )

    const thrust = controller.controls.thrust.value

    rigidBody.addForce(
      new Vector3(0, 0, -600 * thrust + -50).applyQuaternion(
        entity.transform.quaternion
      ),
      true
    )
  })

  return null
}
