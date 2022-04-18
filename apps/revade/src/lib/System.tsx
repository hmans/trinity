import { Callback, TickerStage } from "react-trinity/ticker"

const System = ({
  stage = "update",
  children
}: {
  stage?: TickerStage
  children: (dt: number) => void
}) => <Callback stage={stage}>{children}</Callback>

export default System
