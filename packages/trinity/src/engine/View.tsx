import { useConst } from "@hmans/react-toolbox"
import React, { FC, MutableRefObject, useEffect } from "react"
import { Camera, PerspectiveCamera, Scene, TextureLoader, Vector2 } from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader"
import { LensDirtShader } from "../experiments/LensDirtShader"
import { Update } from "../ticker"
import { EventHandling } from "./EventHandling"
import { OnWindowResize } from "./OnWindowResize"
import { useRenderer } from "./Renderer"

export const View: FC<{
  scene: MutableRefObject<Scene>
  camera: MutableRefObject<Camera>
}> = ({ scene, camera }) => {
  const renderer = useRenderer()
  const composer = useConst(() => new EffectComposer(renderer))

  useEffect(() => {
    composer.addPass(new RenderPass(scene.current, camera.current))

    composer.addPass(new UnrealBloomPass(new Vector2(256, 256), 1.5, 0.8, 0.3))

    const dirt = new ShaderPass(LensDirtShader)
    dirt.uniforms["tDirt"].value = new TextureLoader().load(
      "/textures/dirt01.png"
    )
    dirt.uniforms["strength"].value = 0.5
    composer.addPass(dirt)

    /* Vignette */
    const vignette = new ShaderPass(VignetteShader)
    vignette.uniforms["offset"].value = 0.5
    vignette.uniforms["darkness"].value = 2
    composer.addPass(vignette)
  }, [composer])

  return (
    <>
      <Update stage="render">{() => composer.render()}</Update>

      <EventHandling scene={scene} camera={camera} />

      <OnWindowResize>
        {() => {
          const width = window.innerWidth
          const height = window.innerHeight

          if (camera.current instanceof PerspectiveCamera) {
            camera.current.aspect = width / height
            camera.current.updateProjectionMatrix()
          }
        }}
      </OnWindowResize>
    </>
  )
}
