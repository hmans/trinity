import { store } from "../state"

export const increaseScore = (points: number) =>
  store.set(({ multiplier, score }) => ({ score: score + points * multiplier }))
