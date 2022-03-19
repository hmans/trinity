import { Attraction } from "./Attraction"
import { Avoidance } from "./Avoidance"
import { EnemySpawner } from "./EnemySpawner"
import { PlayerControl } from "./PlayerControl"
import { SpatialHashing } from "./SpatialHashing"
import { Velocity } from "./Velocity"
import { Wobble } from "./Wobble"

const Systems = () => (
  <>
    <EnemySpawner />
    <SpatialHashing />
    <PlayerControl />
    <Attraction />
    <Avoidance />
    <Velocity />
    <Wobble />
  </>
)

export default Systems
