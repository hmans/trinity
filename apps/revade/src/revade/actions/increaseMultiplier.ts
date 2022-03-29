import { store } from "../state"

export const increaseMultiplier = () =>
  store.set(({ multiplier }) => ({ multiplier: multiplier + 1 }))
