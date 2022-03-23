import System from "../lib/System"
import { ECS } from "../state"
import { Attraction } from "./Attraction"
import { AutoSystem } from "./AutoSystem"
import { Avoidance } from "./Avoidance"
import { CameraRig } from "./CameraRig"
import { EnemySpawner } from "./EnemySpawner"
import { PlayerControl } from "./PlayerControl"
import { SploderSpawner } from "./SploderSpawner"
import { Velocity } from "./Velocity"
import { Wobble } from "./Wobble"

const Systems = () => (
  <>
    <EnemySpawner />
    <SploderSpawner />
    <PlayerControl />
    <Attraction />
    <Avoidance />
    <Velocity />
    <Wobble />
    <AutoSystem />
    <CameraRig />

    <System stage="render">{() => ECS.world.queue.flush()}</System>
  </>
)

export default Systems
