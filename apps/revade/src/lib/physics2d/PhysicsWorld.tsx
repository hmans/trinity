import { useTicker } from "@react-trinity/ticker"
import { createECS } from "miniplex-react"
import p2 from "p2-es"
import { createContext, FC, ReactNode, useContext, useState } from "react"
import { Euler, Quaternion, Vector3 } from "three"
import { Entity } from "./Entity"

const tmpVector3 = new Vector3()
const tmpQuat = new Quaternion()
const tmpEuler = new Euler()

/* https://stackoverflow.com/a/62620115 */
const createECSHelper = () => createECS<Entity>()

const PhysicsWorldContext = createContext<{
  world: p2.World
  ecs: ReturnType<typeof createECSHelper>
  bodies: Map<p2.Body, Entity>
}>(null!)

export const PhysicsWorld: FC<{
  gravity?: [number, number]
  children: ReactNode
}> = ({ children, gravity = [0, -9.81] }) => {
  const [ecs] = useState(() => createECS<Entity>())

  const [world] = useState(
    () =>
      new p2.World({
        gravity
      })
  )

  const [bodies] = useState(() => new Map<p2.Body, Entity>())

  const entities = ecs.world.archetype("body", "transform", "options").entities

  /* Step the physics world */
  useTicker("physics", (dt) => {
    /* Step the world */
    world.step(1 / 50, dt, 10)

    /* Copy transforms back into scene */
    for (const { body, transform, options } of entities) {
      if (body.sleepState !== p2.Body.SLEEPING) {
        const position = options.interpolate
          ? body.interpolatedPosition
          : body.position

        let angle = options.interpolate ? body.interpolatedAngle : body.angle

        /* Get initial rotation */
        transform.getWorldQuaternion(tmpQuat)
        tmpEuler.setFromQuaternion(tmpQuat)

        /* position */
        tmpVector3.set(...position, 0)
        transform.parent!.worldToLocal(tmpVector3)

        transform.position.copy(tmpVector3)
        transform.rotation.set(0, 0, angle)
      }
    }
  })

  return (
    <PhysicsWorldContext.Provider value={{ world, ecs, bodies }}>
      {children}
    </PhysicsWorldContext.Provider>
  )
}

export const usePhysicsWorld = () => useContext(PhysicsWorldContext)
