import React, { FC, ReactNode } from "react"
import * as THREE from "three"
import { ParentContext, useManagedThreeObject } from "../reactor"

type SceneProps = {
  children?: ReactNode
}

export const Scene: FC<SceneProps> = ({ children }) => {
  const scene = useManagedThreeObject(() => new THREE.Scene())

  return (
    <ParentContext.Provider value={scene}>{children}</ParentContext.Provider>
  )
}
