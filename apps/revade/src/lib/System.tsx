import { Update, TickerStage } from "react-trinity/ticker"

const System = ({
  stage = "update",
  children
}: {
  stage?: TickerStage
  children: (dt: number) => void
}) => <Update stage={stage}>{children}</Update>

export default System
