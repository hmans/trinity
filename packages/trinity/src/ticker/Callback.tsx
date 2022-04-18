import { FC } from "react"
import { TickerCallback, TickerStage, useTicker } from "./Ticker"

export const Callback: FC<{ stage?: TickerStage; children: TickerCallback }> = ({
  stage = "update",
  children: fun
}) => {
  useTicker(stage, fun)
  return null
}
