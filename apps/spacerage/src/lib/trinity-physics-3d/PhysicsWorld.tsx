import * as RAPIER from "@dimforge/rapier3d-compat"
import { useEffect } from "react"
import { useContext } from "react"
import { createContext } from "react"
import { FC, ReactNode, useRef, useState } from "react"
import T, { useTicker } from "react-trinity"
import { Group } from "three"

export const PhysicsWorldContext = createContext<{ world: RAPIER.World }>(null!)

export const usePhysics = () => useContext(PhysicsWorldContext)

type PhysicsWorldProps = {
  children?: ReactNode
}

export const PhysicsWorld: FC<PhysicsWorldProps> = ({ children }) => {
  const group = useRef<Group>(null!)
  const world = createWorld()

  useTicker("physics", () => {
    if (world) {
      world.step()
      console.log("hi")
    }
  })

  return (
    <T.Group ref={group}>
      {world && (
        <PhysicsWorldContext.Provider value={{ world }}>
          {children}
        </PhysicsWorldContext.Provider>
      )}
    </T.Group>
  )
}

const createWorld = () => {
  const [world, setWorld] = useState<RAPIER.World>()

  useEffect(() => {
    setWorld(new RAPIER.World({ x: 0, y: -9.81, z: 0 }))
    return () => setWorld(undefined)
  }, [])

  return world
}
