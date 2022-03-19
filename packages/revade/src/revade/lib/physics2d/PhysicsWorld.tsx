import { useTicker } from "@hmans/trinity"
import * as miniplex from "miniplex"
import * as pl from "planck"
import { createContext, FC, useContext, useEffect, useState } from "react"
import { Entity } from "./Entity"

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

  useEffect(() => {
    world.on("begin-contact", function (contact) {
      const userDataA = contact.getFixtureA().getBody().getUserData() as Entity
      const userDataB = contact.getFixtureB().getBody().getUserData() as Entity

      userDataA.physics2d.onCollisionEnter?.()
      userDataB.physics2d.onCollisionEnter?.()
    })

    world.on("end-contact", function (contact) {
      const userDataA = contact.getFixtureA().getBody().getUserData() as Entity
      const userDataB = contact.getFixtureB().getBody().getUserData() as Entity

      userDataA.physics2d.onCollisionExit?.()
      userDataB.physics2d.onCollisionExit?.()
    })

    world.on("pre-solve", function (contact, oldManifold) {
      const userDataA = contact.getFixtureA().getBody().getUserData() as Entity
      const userDataB = contact.getFixtureB().getBody().getUserData() as Entity

      userDataA.physics2d.onCollisionStay?.()
      userDataB.physics2d.onCollisionStay?.()
    })
  }, [world])

  useTicker("fixed", (dt) => {
    /* Step the physics world */
    world.step(dt)

    /* Apply changes from physics world to scene objects */
    for (const {
      physics2d: { body, transform }
    } of ecs.entities) {
      if (body.isAwake()) {
        const pos = body.getPosition()
        const rot = body.getAngle()
        transform.position.set(pos.x, pos.y, 0)
        transform.rotation.set(0, 0, rot)
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
