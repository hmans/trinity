import { useStore } from "statery"
import { GameFSM } from "./GameFSM"
import { store } from "./state"

import * as UI from "../lib/ui"

const theme = {
  padding: "30px",
  color: "white",
  font: "4vw/1 'Helvetica Neue'",
  fontWeight: "bold"
}

export const HUD = () => {
  const { score, multiplier } = useStore(store)

  return (
    <UI.Canvas theme={theme}>
      <UI.Panel>
        <UI.Text>REVADE</UI.Text>

        <GameFSM.Match state={["gameplay", "gameover"]}>
          <UI.Text>
            SCORE: {score.toLocaleString("de-DE", { maximumFractionDigits: 0 })}
          </UI.Text>
          <UI.Text>
            MULTIPLIER:{" "}
            {multiplier.toLocaleString("de-DE", { maximumFractionDigits: 0 })}x
          </UI.Text>
        </GameFSM.Match>
      </UI.Panel>
    </UI.Canvas>
  )
}
