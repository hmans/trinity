import System from "../../lib/System"
import { controller } from "../controller"

export const UpdateControllers = () => (
  <System stage="early">
    {() => {
      controller.update()
    }}
  </System>
)
