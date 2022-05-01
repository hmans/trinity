import { useEffect } from "react"
import { useCubeTexture, useParent } from "react-trinity"
import { Scene } from "three"

export const Skybox = () => {
  const parent = useParent() as Scene

  const cube = useCubeTexture([
    "/textures/skybox/right.png",
    "/textures/skybox/left.png",
    "/textures/skybox/top.png",
    "/textures/skybox/bottom.png",
    "/textures/skybox/front.png",
    "/textures/skybox/back.png"
  ])

  useEffect(() => {
    if (cube) parent.background = cube
  }, [cube, parent])

  return null
}
