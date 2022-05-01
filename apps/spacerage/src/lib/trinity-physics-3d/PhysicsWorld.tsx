import { useRef } from "react"
import { ReactNode } from "react"
import { FC } from "react"
import T from "react-trinity"
import { Group } from "three"

type PhysicsWorldProps = {
  children?: ReactNode
}

export const PhysicsWorld: FC<PhysicsWorldProps> = ({ children }) => {
  const group = useRef<Group>(null!)

  return <T.Group>{children}</T.Group>
}
