import { useBody } from "./lib/physics2d/BodyContext"
import { ECS } from "./state"

export const BodyThiefHack = () => {
  const body = useBody()
  return <ECS.Component name="body" data={body} />
}
