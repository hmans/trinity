import { useStore } from "statery"
import { GameFSM } from "./GameFSM"
import "./HUD.css"
import { store } from "./state"

import * as UI from "../lib/ui"

export const HUD = () => {
  const { score, multiplier } = useStore(store)

  return (
    <UI.Canvas>
      <div className="HUD">
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
