import { useEffect } from "react"
import { resetGameplayState } from "./actions/resetGameplayState"
import { filter } from "./audio"
import { EnemySpawner } from "./EnemySpawner"
import { Enemies } from "./entities/Enemies"
import { Pickups } from "./entities/Pickups"
import { Player } from "./entities/Player"
import { Sploders } from "./entities/Sploders"
import { Splosions } from "./entities/Splosions"
import { GameFSM } from "./GameFSM"

export const Gameplay = () => {
  useEffect(resetGameplayState, [])

  useEffect(() => {
    filter.frequency.rampTo(20000, 3)
  }, [])

  return (
    <>
      <Enemies />
      <Sploders />
      <Splosions />
      <Pickups />

      <GameFSM.Match state="gameplay">
        <Player />
        <EnemySpawner />
      </GameFSM.Match>
    </>
  )
}
