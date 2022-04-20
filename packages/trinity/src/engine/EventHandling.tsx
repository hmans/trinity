import React, { FC, MutableRefObject, useCallback, useMemo } from "react"
import {
  Camera,
  Intersection,
  Object3D,
  Raycaster,
  Scene,
  Vector2
} from "three"
import { On } from "./On"
import { useRenderer } from "./Renderer"

export const EventHandling: FC<{
  camera: MutableRefObject<Camera>
  scene: MutableRefObject<Scene>
}> = ({ camera, scene }) => {
  const renderer = useRenderer()
  const pointer = useMemo(() => new Vector2(), [])
  const raycaster = useMemo(() => new Raycaster(), [])
  const intersects = new Array<Intersection<Object3D<Event>>>()

  return (
    <>
      <On target={renderer.domElement} event="pointermove">
        {useCallback(
          (e: PointerEvent) => {
            /* Get normalized pointer position */
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1
            pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

            /* Prepare raycaster */
            raycaster.setFromCamera(pointer, camera.current)

            /* Find intersects */
            intersects.length = 0
            raycaster.intersectObject(scene.current, true, intersects)
          },
          [renderer, raycaster]
        )}
      </On>

      <On target={renderer.domElement} event="pointerdown">
        {useCallback(
          (e: PointerEvent) => {
            console.log(intersects[0])
          },
          [renderer, raycaster]
        )}
      </On>
    </>
  )
}
