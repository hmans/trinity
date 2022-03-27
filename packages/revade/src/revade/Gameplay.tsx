import { EnemySpawner } from "./EnemySpawner"
import { Enemies } from "./entities/Enemies"
import { Pickups } from "./entities/Pickups"
import { Player } from "./entities/Player"
import { Sploders } from "./entities/Sploders"
import { Splosions } from "./entities/Splosions"
import { GameFSM } from "./Game"

export const Gameplay = () => (
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
