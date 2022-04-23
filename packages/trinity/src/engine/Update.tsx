import { FC } from "react"
import { Object3D, WebGLRenderer } from "three"
import { useParent } from "../reactor"
import { useRenderer } from "./Renderer"
import { TickerStage } from "./Ticker"
import { useTicker } from "./useTicker"

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
