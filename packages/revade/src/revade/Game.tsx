import T, { Engine, View } from "@hmans/trinity"
import { Player } from "./Player"

export const Game = () => {
  return (
    <Engine>
      <View>
        <T.AmbientLight />

        <Player />
      </View>
    </Engine>
  )
}
