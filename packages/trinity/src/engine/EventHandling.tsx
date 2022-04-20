import { FC, MutableRefObject, useEffect, useMemo } from "react"
import {
  Camera,
  Intersection,
  Object3D,
  Raycaster,
  Scene,
  Vector2
} from "three"
import { useRenderer } from "./Renderer"

export const EventHandling: FC<{
  camera: MutableRefObject<Camera>
  scene: MutableRefObject<Scene>
}> = ({ camera, scene }) => {
  const renderer = useRenderer()
  const pointer = useMemo(() => new Vector2(), [])
  const raycaster = useMemo(() => new Raycaster(), [])
  const intersects = new Array<Intersection<Object3D<Event>>>()

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      /* Get normalized pointer position */
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

      /* Prepare raycaster */
      raycaster.setFromCamera(pointer, camera.current)

      /* Find intersects */
      intersects.length = 0
      raycaster.intersectObject(scene.current, true, intersects)
    }

    const handleClick = (e: PointerEvent) => {
      console.log(intersects[0])
    }

    /* Register/unregister event handlers */
    renderer.domElement.addEventListener("pointermove", handleMove)
    renderer.domElement.addEventListener("pointerdown", handleClick)

    return () => {
      renderer.domElement.removeEventListener("pointermove", handleMove)
      renderer.domElement.removeEventListener("pointerdown", handleClick)
    }
  }, [renderer, camera, scene])

  return null
}
