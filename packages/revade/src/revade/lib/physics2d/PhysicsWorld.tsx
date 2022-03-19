import { useTicker } from "@hmans/trinity"
import * as miniplex from "miniplex"
import { IEntity } from "miniplex"
import * as pl from "planck"
import { createContext, FC, useContext, useState } from "react"
import { Object3D } from "three"

type Entity = {
  body: pl.Body
  transform: Object3D
} & IEntity

const PhysicsWorldContext = createContext<{
  world: pl.World
  ecs: miniplex.World<Entity>
}>(null!)

export const PhysicsWorld: FC<{
  gravity?: [number, number]
}> = ({ children, gravity = [0, -9.81] }) => {
  const [ecs] = useState(() => new miniplex.World<Entity>())

  const [world] = useState(() =>
    pl.World({
      gravity: pl.Vec2(...gravity)
    })
  )

  useTicker("fixed", (dt) => {
    /* Step the physics world */
    world.step(dt)

    /* Apply changes from physics world to scene objects */
    for (const { body, transform } of ecs.entities) {
      const pos = body.getPosition()
      const rot = body.getAngle()
      transform.position.set(pos.x, pos.y, 0)
      transform.rotation.set(0, 0, rot)
    }
  })

  return (
    <PhysicsWorldContext.Provider value={{ world, ecs }}>
      {children}
    </PhysicsWorldContext.Provider>
  )
}

export const usePhysicsWorld = () => useContext(PhysicsWorldContext)
