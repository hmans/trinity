import { useStore } from "statery"
import { GameFSM } from "./GameFSM"
import { store } from "./state"

import * as UI from "../lib/ui"

const theme = {
  padding: "30px",
  color: "white",
  font: "30px/1 'Helvetica Neue'",
  fontWeight: "bold"
}

export const HUD = () => {
  const { score, multiplier } = useStore(store)

  return (
    <UI.Canvas theme={theme}>
      <div>
        <div>REVADE</div>

        <GameFSM.Match state={["gameplay", "gameover"]}>
          <div>
            SCORE: {score.toLocaleString("de-DE", { maximumFractionDigits: 0 })}
          </div>
          <div>
            MULTIPLIER:{" "}
            {multiplier.toLocaleString("de-DE", { maximumFractionDigits: 0 })}x
          </div>
        </GameFSM.Match>
      </div>
    </UI.Canvas>
  )
}
