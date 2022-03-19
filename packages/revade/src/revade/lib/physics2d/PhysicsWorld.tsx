import * as pl from "planck"
import { createContext, FC, useContext, useState } from "react"

const PhysicsWorldContext = createContext<pl.World>(null!)

export const PhysicsWorld: FC = ({ children }) => {
  const [world] = useState(() =>
    pl.World({
      gravity: pl.Vec2(0, -10)
    })
  )

  return (
    <PhysicsWorldContext.Provider value={world}>
      {children}
    </PhysicsWorldContext.Provider>
  )
}

export const usePhysicsWorld = () => useContext(PhysicsWorldContext)
