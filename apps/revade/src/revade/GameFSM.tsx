import { makeFSM } from "../lib/FSM"

export const GameFSM = makeFSM({
  states: ["menu", "gameplay", "pause", "gameover"],
  state: "menu",
  transitions: {
    startGame: { from: "menu", to: "gameplay" },
    pauseGame: { from: "gameplay", to: "pause" },
    resumeGame: { from: "pause", to: "gameplay" },
    abortGame: { from: "pause", to: "menu" },
    gameOver: { from: "gameplay", to: "gameover" },
    returnToMenu: { from: ["gameover", "gameplay"], to: "menu" }
  }
})
