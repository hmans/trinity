import * as RAPIER from "@dimforge/rapier3d-compat"
import { useEffect } from "react"
import { FC, ReactNode, useRef, useState } from "react"
import T from "react-trinity"
import { Group } from "three"

type PhysicsWorldProps = {
  children?: ReactNode
}

export const PhysicsWorld: FC<PhysicsWorldProps> = ({ children }) => {
  const group = useRef<Group>(null!)
  const [world, setWorld] = useState<RAPIER.World>()

  useEffect(() => {
    setWorld(new RAPIER.World({ x: 0, y: -9.81, z: 0 }))
    return () => setWorld(undefined)
  })

  return <T.Group ref={group}>{world && children}</T.Group>
}
