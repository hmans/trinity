import { Engine, Scene } from "@hmans/trinity"
import { Bubbles } from "./Bubbles"
import { Hud } from "./Hud"

function App() {
  return (
    <Engine>
      <Scene>
        <Bubbles />
      </Scene>
      <Scene clearDepth>
        <Hud />
      </Scene>
    </Engine>
  )
}

export default App
