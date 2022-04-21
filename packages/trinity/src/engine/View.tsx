import React, { createContext, FC, ReactNode, useContext } from "react"
import { Camera, PerspectiveCamera, Scene } from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "../postprocessing"
import { Update } from "../ticker"
import { useComposer } from "./Composer"
import { EventHandling } from "./EventHandling"
import { OnWindowResize } from "./OnWindowResize"

const ViewContext = createContext<{ composer: EffectComposer }>(null!)

export const useView = () => useContext(ViewContext)

export const View: FC<{
  scene?: Scene | null
  camera?: Camera | null
  render?: boolean
  children?: ReactNode
}> = ({ scene, camera, children, render = true }) => {
  const composer = useComposer()

  if (!scene || !camera) return null

  return (
    <ViewContext.Provider value={{ composer }}>
      {/* We definitely want some event handling. */}
      <EventHandling scene={scene} camera={camera} />

      {/* When the window is being resized, we need to adjust the active camera. */}
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

      {/* Mount the render update function. */}
      <Update stage="render">{() => composer.render()}</Update>

      {/* If the `render` prop is true, run a default Render Pass. */}
      {render && <RenderPass scene={scene} camera={camera} />}

      {/* Mount children (possibly additional effect passes) */}
      {children}
    </ViewContext.Provider>
  )
}
