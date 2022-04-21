import { useContext, useLayoutEffect } from "react"
import { TickerStage, TickerCallback, TickerContext } from "./Ticker"

export const useTicker = (stage: TickerStage, callback: TickerCallback) => {
  const ticker = useContext(TickerContext)

  useLayoutEffect(() => {
    ticker.on(stage, callback)
    return () => ticker.off(stage, callback)
  })
}
