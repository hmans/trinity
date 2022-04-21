import { FC } from "react"
import { Object3D, WebGLRenderer } from "three"
import { useRenderer } from "../engine/Renderer"
import { useParent } from "../reactor"
import { TickerStage, useTicker } from "./Ticker"

type UpdateFunction = (
  dt: number,
  state: { parent: Object3D; renderer: WebGLRenderer }
) => void

export const Update: FC<{ stage?: TickerStage; children: UpdateFunction }> = ({
  stage = "update",
  children: fun
}) => {
  const parent = useParent()
  const renderer = useRenderer()

  useTicker(stage, (dt) => fun(dt, { parent, renderer }))
  return null
}
