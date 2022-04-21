import { useConst } from "@hmans/react-toolbox"
import React, { createContext, FC, ReactNode, useContext } from "react"
import { Camera, PerspectiveCamera, Scene } from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "../postprocessing"
import { Update } from "../ticker"
import { EventHandling } from "./EventHandling"
import { OnWindowResize } from "./OnWindowResize"
import { useRenderer } from "./Renderer"

const ViewContext = createContext<{ composer: EffectComposer }>(null!)

export const useView = () => useContext(ViewContext)

export const View: FC<{
  scene: Scene
  camera: Camera
  render?: boolean
  children?: ReactNode
}> = ({ scene, camera, children, render = true }) => {
  const renderer = useRenderer()
  const composer = useConst(() => new EffectComposer(renderer))

  return (
    <ViewContext.Provider value={{ composer }}>
      <EventHandling scene={scene} camera={camera} />

      <OnWindowResize>
        {() => {
          const width = window.innerWidth
          const height = window.innerHeight

          if (camera instanceof PerspectiveCamera) {
            camera.aspect = width / height
            camera.updateProjectionMatrix()
          }
        }}
      </OnWindowResize>

      {render && <RenderPass scene={scene} camera={camera} />}

      {children}

      <Update stage="render">{() => composer.render()}</Update>
    </ViewContext.Provider>
  )
}
