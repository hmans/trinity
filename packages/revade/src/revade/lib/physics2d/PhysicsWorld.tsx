import { useTicker } from "@hmans/trinity"
import { createECS } from "miniplex/react"
import p2 from "p2-es"
import { createContext, FC, useContext, useEffect, useState } from "react"
import { Entity } from "./Entity"

/* https://stackoverflow.com/a/62620115 */
const createECSHelper = () => createECS<Entity>()

const PhysicsWorldContext = createContext<{
  world: p2.World
  ecs: ReturnType<typeof createECSHelper>
  bodies: Map<p2.Body, Entity>
}>(null!)

export const PhysicsWorld: FC<{
  gravity?: [number, number]
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
    world.step(1 / 50, dt, 10)

    for (const entity of entities) {
      const { body, transform, options } = entity
      if (body.sleepState !== p2.Body.SLEEPING) {
        if (options.interpolate) {
          transform.position.set(...body.interpolatedPosition, 0)
          transform.rotation.set(0, 0, body.interpolatedAngle)
        } else {
          transform.position.set(...body.position, 0)
          transform.rotation.set(0, 0, body.angle)
        }
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
