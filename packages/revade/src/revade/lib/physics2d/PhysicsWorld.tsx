import { useTicker } from "@hmans/trinity"
import * as miniplex from "miniplex"
import p2 from "p2-es"
import { createContext, FC, useContext, useEffect, useState } from "react"
import { Entity } from "./Entity"

const PhysicsWorldContext = createContext<{
  world: p2.World
  ecs: miniplex.World<Entity>
}>(null!)

export const PhysicsWorld: FC<{
  gravity?: [number, number]
}> = ({ children, gravity = [0, -9.81] }) => {
  const [ecs] = useState(() => new miniplex.World<Entity>())

  const [world] = useState(
    () =>
      new p2.World({
        gravity
      })
  )

  /* Set up contact event handling */
  useEffect(() => {
    world.on("beginContact", (e: p2.BeginContactEvent) => {})

    world.on("endContact", (e: p2.EndContactEvent) => {})

    world.on("preSolve", (e: p2.PreSolveEvent) => {})
  }, [world])

  /* Step the physics world */
  useTicker("physics", (dt) => {
    world.step(1 / 50, dt, 10)

    for (const { physics2d } of ecs.entities) {
      const { interpolate, body, transform } = physics2d

      if (body.sleepState !== p2.Body.SLEEPING) {
        if (interpolate) {
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
    <PhysicsWorldContext.Provider value={{ world, ecs }}>
      {children}
    </PhysicsWorldContext.Provider>
  )
}

export const usePhysicsWorld = () => useContext(PhysicsWorldContext)
