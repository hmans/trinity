import { store } from "../state"

export const resetGameplayState = () => {
  store.set({ score: 0, multiplier: 1 })
}
