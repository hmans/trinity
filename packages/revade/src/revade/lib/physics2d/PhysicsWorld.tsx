import { useTicker } from "@hmans/trinity"
import * as miniplex from "miniplex"
import p2 from "p2-es"
import { createContext, FC, useContext, useEffect, useState } from "react"
import { MathUtils, Vector3 } from "three"
import { tmpVector3 } from "../temps"
import { Entity } from "./Entity"

const PhysicsWorldContext = createContext<{
  world: p2.World
  ecs: miniplex.World<Entity>
  bodies: Map<p2.Body, Entity>
}>(null!)

export const PhysicsWorld: FC<{
  gravity?: [number, number]
}> = ({ children, gravity = [0, -9.81] }) => {
  const [ecs] = useState(() => new miniplex.World<Entity>())
  const [bodies] = useState(() => new Map<p2.Body, Entity>())

  const [world] = useState(
    () =>
      new p2.World({
        gravity
      })
  )

  useEffect(() => {
    world.on("beginContact", (e: p2.BeginContactEvent) => {
      const entityA = bodies.get(e.bodyA)!
      const entityB = bodies.get(e.bodyB)!

      entityA?.physics2d.onCollisionEnter?.(entityB)
      entityB?.physics2d.onCollisionEnter?.(entityA)
    })

    world.on("endContact", (e: p2.EndContactEvent) => {
      const entityA = bodies.get(e.bodyA)!
      const entityB = bodies.get(e.bodyB)!

      entityA?.physics2d.onCollisionExit?.(entityB)
      entityB?.physics2d.onCollisionExit?.(entityA)
    })

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
    <PhysicsWorldContext.Provider value={{ world, ecs, bodies }}>
      {children}
    </PhysicsWorldContext.Provider>
  )
}

export const usePhysicsWorld = () => useContext(PhysicsWorldContext)
