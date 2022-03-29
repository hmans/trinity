import { Callback } from "react-trinity"
import { TickerStage } from "react-trinity/src/engine/Ticker"

const System = ({
  stage = "update",
  children
}: {
  stage?: TickerStage
  children: (dt: number) => void
}) => <Callback stage={stage}>{children}</Callback>

export default System
