import { Attraction } from "./Attraction"
import { Avoidance } from "./Avoidance"
import { CameraRig } from "./CameraRig"
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
    <CameraRig />
  </>
)

export default Systems
