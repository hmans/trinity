import { FC } from "react"
import { Object3D, Scene, WebGLRenderer } from "three"
import { useRenderer } from "../engine/Renderer"
import { useScene } from "../engine/Scene"
import { useParent } from "../reactor"
import { TickerStage, useTicker } from "./Ticker"

type UpdateFunction = (
  dt: number,
  state: {
    parent: Object3D
    scene: Scene
    renderer: WebGLRenderer
  }
) => void

export const Update: FC<{ stage?: TickerStage; children: UpdateFunction }> = ({
  stage = "update",
  children: fun
}) => {
  const parent = useParent()
  const scene = useScene()
  const renderer = useRenderer()

  useTicker(stage, (dt) => fun(dt, { parent, scene, renderer }))
  return null
}
