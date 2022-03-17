import { Engine, Scene } from "@hmans/trinity"
import { Bubbles } from "./Bubbles"
import { Hud } from "./Hud"

function App() {
  return (
    <Engine>
      <Scene>
        <Bubbles />
      </Scene>
      <Scene>
        <Hud />
      </Scene>
    </Engine>
  )
}

export default App
