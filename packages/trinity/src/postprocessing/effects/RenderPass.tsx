import { FC, useMemo } from "react"
import { Camera, Scene } from "three"
import { RenderPass as RenderPassImpl } from "three/examples/jsm/postprocessing/RenderPass"
import { useEffectPass } from "../useEffectPass"

export const RenderPass: FC<{ scene: Scene; camera: Camera }> = ({
  scene,
  camera
}) => {
  const pass = useMemo(() => new RenderPassImpl(scene, camera), [scene, camera])
  useEffectPass(pass)
  return null
}
