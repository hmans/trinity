import { Tag } from "miniplex"
import { useEffect } from "react"
import { useTicker } from "react-trinity"
import { useRigidBody } from "react-trinity/physics3d"
import { Vector3 } from "three"
import { controller } from "./controller"
import { ECS } from "./ecs"

export const PlayerController = () => {
  const { rigidBody, entity } = useRigidBody()

  const playerArchetype = ECS.useArchetype("isPlayer")
  const player = playerArchetype.entities[0]

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

    // const thrust = controller.controls.thrust.value

    // rigidBody.addForce(
    //   new Vector3(0, 0, -600 * thrust + -50).applyQuaternion(
    //     entity.transform.quaternion
    //   ),
    //   true
    // )

    rigidBody.addForce(
      new Vector3(0, 0, -300).applyQuaternion(entity.transform.quaternion),
      true
    )

    /* Fire bullets */
    if (player) {
      const fire = controller.controls.fire.value

      if (fire) {
        ECS.world.createEntity({
          isBullet: Tag,
          initialTransform: player.transform
        })
      }
    }
  })

  return null
}
