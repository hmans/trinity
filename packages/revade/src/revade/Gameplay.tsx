import { EnemySpawner } from "./EnemySpawner"
import { Enemies } from "./entities/Enemies"
import { Pickups } from "./entities/Pickups"
import { Player } from "./entities/Player"
import { Sploders } from "./entities/Sploders"
import { Splosions } from "./entities/Splosions"
import Systems from "./systems"

export const Gameplay = () => (
  <>
    <Player />
    <Enemies />
    <Sploders />
    <Splosions />
    <Pickups />

    <EnemySpawner />

    <Systems />
  </>
)
