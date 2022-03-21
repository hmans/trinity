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
  const [bodies] = useState(() => new Map())

  const [world] = useState(
    () =>
      new p2.World({
        gravity
      })
  )

  useEffect(() => {
    world.on("beginContact", (e: p2.BeginContactEvent) => {
      const entityA = bodies.get(e.bodyA)
      const entityB = bodies.get(e.bodyB)

      entityA?.physics2d.onCollisionEnter?.(entityB)
      entityB?.physics2d.onCollisionEnter?.(entityA)
    })

    world.on("endContact", (e: p2.EndContactEvent) => {
      const entityA = bodies.get(e.bodyA)
      const entityB = bodies.get(e.bodyB)

      entityA?.physics2d.onCollisionExit?.(entityB)
      entityB?.physics2d.onCollisionExit?.(entityA)
    })

    world.on("preSolve", (e: p2.PreSolveEvent) => {})
  }, [world])

  /* Step the physics world */
  useTicker("update", (dt) => {
    /* FIXME: doing this in update is wroooong */

    world.step(dt)

    for (const { physics2d } of ecs.entities) {
      const { interpolate, previousPosition, previousAngle, body, transform } =
        physics2d

      if (body.sleepState !== p2.Body.SLEEPING) {
        const nextPosition = body.position
        const nextAngle = body.angle

        if (interpolate) {
          transform.position.set(
            MathUtils.lerp(previousPosition[0], nextPosition[0], alpha),
            MathUtils.lerp(previousPosition[1], nextPosition[1], alpha),
            0
          )

          transform.rotation.set(
            0,
            0,
            MathUtils.lerp(previousAngle, nextAngle, alpha)
          )
        } else {
          transform.position.set(nextPosition[0], nextPosition[1], 0)
          transform.rotation.set(0, 0, nextAngle)
        }

        /* Remember previous state */
        physics2d.previousPosition = nextPosition
        physics2d.previousAngle = nextAngle
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
