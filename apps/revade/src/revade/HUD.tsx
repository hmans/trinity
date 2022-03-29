import { useStore } from "statery"
import { GameFSM } from "./Game"
import "./HUD.css"
import { store } from "./state"

export const HUD = () => {
  const { score, multiplier } = useStore(store)

  return (
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
  )
}
