import React, {
  createContext,
  FC,
  useContext,
  useLayoutEffect,
  useState
} from "react"
import { useAnimationFrame } from "./useAnimationFrame"

export type TickerStage =
  | "early"
  | "physics"
  | "fixed"
  | "lateFixed"
  | "update"
  | "lateUpdate"
  | "render"

const TickerContext = createContext<TickerImpl>(null!)

export type TickerCallback = (dt: number) => void

class TickerImpl {
  timeScale = 1
  fixedStep = 1 / 50
  maxDelta = 1
  lastTime = performance.now()

  private callbacks: Map<TickerStage, TickerCallback[]> = new Map()
  private acc: number = 0

  on(stage: TickerStage, callback: TickerCallback) {
    if (!this.callbacks.has(stage)) this.callbacks.set(stage, [])
    this.callbacks.get(stage)!.push(callback)
  }

  off(stage: TickerStage, callback: TickerCallback) {
    const callbacks = this.callbacks.get(stage)!
    const pos = callbacks.indexOf(callback)
    callbacks.splice(pos, 1)
  }

  tick(time: DOMHighResTimeStamp) {
    /* Calculate frame delta */
    const frameDelta = (time - this.lastTime) / 1000
    this.lastTime = time

    /* Clamp the deltatime to prevent situations where thousands of frames are executed after
    the user returns from another tab. */
    const dt = Math.max(
      0,
      this.maxDelta ? Math.min(frameDelta, this.maxDelta) : frameDelta
    )

    const dtScaled = dt * this.timeScale

    /* Run the normale update callbacks. */
    this.execute("early", dtScaled)
    this.execute("physics", dtScaled)

    /* Run fixed-steps callbacks, based on our internal accumulator. */
    this.acc += dtScaled
    while (this.acc >= this.fixedStep) {
      this.acc -= this.fixedStep
      this.execute("fixed", this.fixedStep)
      this.execute("lateFixed", this.fixedStep)
    }

    this.execute("update", dtScaled)
    this.execute("lateUpdate", dtScaled)
    this.execute("render", dtScaled)
  }

  private execute(stage: TickerStage, dt: number) {
    const callbacks = this.callbacks.get(stage)
    if (callbacks) {
      for (const callback of callbacks) callback(dt)
    }
  }
}

export const Ticker: FC<{ timeScale?: number }> = ({
  children,
  timeScale = 1
}) => {
  const [ticker] = useState(() => new TickerImpl())

  useLayoutEffect(() => {
    ticker.timeScale = timeScale
    return () => void (ticker.timeScale = 1)
  }, [ticker, timeScale])

  useAnimationFrame(ticker.tick.bind(ticker))

  return (
    <TickerContext.Provider value={ticker}>{children}</TickerContext.Provider>
  )
}

export const useTicker = (stage: TickerStage, callback: TickerCallback) => {
  const ticker = useContext(TickerContext)

  useLayoutEffect(() => {
    ticker.on(stage, callback)
    return () => ticker.off(stage, callback)
  })
}
