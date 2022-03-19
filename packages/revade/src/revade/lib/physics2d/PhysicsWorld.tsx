import { useTicker } from "@hmans/trinity"
import * as pl from "planck"
import { createContext, FC, useContext, useState } from "react"

const PhysicsWorldContext = createContext<pl.World>(null!)

type PhysicsWorldProps = {
  gravity?: [number, number]
}

export const PhysicsWorld: FC<PhysicsWorldProps> = ({
  children,
  gravity = [0, -9.81]
}) => {
  const [world] = useState(() =>
    pl.World({
      gravity: pl.Vec2(...gravity)
    })
  )

  useTicker("fixed", (dt) => {
    world.step(dt)
  })

  return (
    <PhysicsWorldContext.Provider value={world}>
      {children}
    </PhysicsWorldContext.Provider>
  )
}

export const usePhysicsWorld = () => useContext(PhysicsWorldContext)
