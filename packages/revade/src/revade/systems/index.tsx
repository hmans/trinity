import System from "../../lib/System"
import { ECS } from "../state"
import { Attraction } from "./Attraction"
import { AttractPickups } from "./AttractPickups"
import { AutoSystem } from "./AutoSystem"
import { Avoidance } from "./Avoidance"
import { CameraRig } from "./CameraRig"
import { EnemySpawner } from "./EnemySpawner"
import { PlayerControl } from "./PlayerControl"
import { SploderSpawner } from "./SploderSpawner"
import { UpdateControllers } from "./UpdateControllers"
import { Velocity } from "./Velocity"
import { Wobble } from "./Wobble"

const Systems = () => (
  <>
    <UpdateControllers />

    <EnemySpawner />
    <SploderSpawner />
    <PlayerControl />

    <Attraction />
    <AttractPickups />
    <Avoidance />
    <Velocity />
    <Wobble />
    <AutoSystem />
    <CameraRig />

    <System stage="render">{() => ECS.world.queue.flush()}</System>
  </>
)

export default Systems
