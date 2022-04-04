import System from "../../lib/System"
import { GameFSM } from "../GameFSM"
import { ECS } from "../state"
import { Attraction } from "./Attraction"
import { AttractPickups } from "./AttractPickups"
import { AutoSystem } from "./AutoSystem"
import { Avoidance } from "./Avoidance"
import { CameraRig } from "./CameraRig"
import { EnemySpawner } from "./EnemySpawner"
import { Lifetime } from "./Lifetime"
import { Pickups } from "./Pickups"
import { PlayerControl } from "./PlayerControl"
import { SploderSpawner } from "./SploderSpawner"
import { UpdateControllers } from "./UpdateControllers"
import { Velocity } from "./Velocity"

const Systems = () => (
  <>
    <UpdateControllers />
    <Lifetime />

    <EnemySpawner />
    <GameFSM.Match state="gameplay">
      <SploderSpawner />
    </GameFSM.Match>
    <PlayerControl />

    <Attraction />
    <AttractPickups />
    <Avoidance />
    <Velocity />
    <AutoSystem />
    <CameraRig />
    <Pickups />

    <System stage="render">{() => ECS.world.queue.flush()}</System>
  </>
)

export default Systems
