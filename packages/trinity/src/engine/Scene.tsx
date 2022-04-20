import React, { createContext, forwardRef, useContext } from "react"
import * as THREE from "three"
import T, { ReactorComponentProps, useManagedThreeObject } from "../reactor"

type SceneProps = ReactorComponentProps<typeof THREE.Scene>

const SceneContext = createContext<THREE.Scene>(null!)

export const Scene = forwardRef<THREE.Scene, SceneProps>((sceneProps, ref) => {
  const scene = useManagedThreeObject(() => new THREE.Scene())

  return (
    <SceneContext.Provider value={scene}>
      <T.Scene object={scene} ref={ref} {...sceneProps} />
    </SceneContext.Provider>
  )
})

export const useScene = () => useContext(SceneContext)
