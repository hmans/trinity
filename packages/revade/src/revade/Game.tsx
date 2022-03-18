import T, { Engine, View } from "@hmans/trinity"
import { Player } from "./Player"
import Systems from "./systems"

export const Game = () => (
  <Engine>
    <Systems />

    <View>
      <T.AmbientLight />
      <Player />
    </View>
  </Engine>
)
