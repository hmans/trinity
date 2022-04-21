import { FC, useMemo } from "react"
import { Vector2 } from "three"
import { UnrealBloomPass as UnrealBloomPassImpl } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { useEffectPass } from "../useEffectPass"

export const UnrealBloomPass: FC<{}> = ({}) => {
  const pass = useMemo(
    () => new UnrealBloomPassImpl(new Vector2(256, 256), 1.5, 0.8, 0.3),
    []
  )

  useEffectPass(pass)

  return null
}
