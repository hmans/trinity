import { Callback } from "@hmans/trinity"
import { TickerStage } from "@hmans/trinity/src/engine/Ticker"

const System = ({
  stage = "update",
  children
}: {
  stage?: TickerStage
  children: (dt: number) => void
}) => <Callback stage={stage}>{children}</Callback>

export default System
