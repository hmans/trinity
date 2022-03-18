import { Attraction } from "./Attraction"
import { PlayerControl } from "./PlayerControl"
import { Velocity } from "./Velocity"
import { Wobble } from "./Wobble"

const Systems = () => (
  <>
    <PlayerControl />
    <Attraction />
    <Velocity />
    <Wobble />
  </>
)

export default Systems
