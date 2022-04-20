import { FC } from "react"
import { Object3D } from "three"
import { useParent } from "../reactor"
import { TickerStage, useTicker } from "./Ticker"

type UpdateFunction = (dt: number, parent: Object3D) => void

export const Update: FC<{ stage?: TickerStage; children: UpdateFunction }> = ({
  stage = "update",
  children: fun
}) => {
  const parent = useParent()

  useTicker(stage, (dt) => fun(dt, parent))
  return null
}
