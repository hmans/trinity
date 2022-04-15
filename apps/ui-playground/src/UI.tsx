import { css } from "@emotion/react"
import { Canvas, Panel } from "@hmans/ui"

export const UI = () => (
  <Canvas theme={css({ fontFamily: "Georgia" })}>
    <Panel middle center>
      middle center
    </Panel>
    <Panel top left>
      top left
    </Panel>
    <Panel top center>
      top center
    </Panel>
    <Panel top right>
      top right
    </Panel>
    <Panel middle right>
      middle right
    </Panel>
    <Panel bottom right>
      bottom right
    </Panel>
    <Panel bottom center>
      bottom center
    </Panel>
    <Panel bottom left>
      bottom left
    </Panel>
    <Panel middle left>
      middle left
    </Panel>
  </Canvas>
)
