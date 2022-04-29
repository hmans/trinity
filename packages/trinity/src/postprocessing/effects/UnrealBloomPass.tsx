import { FC, useMemo } from "react"
import { Vector2 } from "three"
import { UnrealBloomPass as UnrealBloomPassImpl } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { useEffectPass } from "../useEffectPass"

export const UnrealBloomPass: FC<{
  size?: [number, number]
  strength?: number
  radius?: number
  threshold?: number
}> = ({
  size = [window.innerWidth, window.innerHeight],
  strength = 1,
  radius = 1,
  threshold = 0.9
}) => {
  const pass = useMemo(
    () =>
      new UnrealBloomPassImpl(
        new Vector2(...size),
        strength,
        radius,
        threshold
      ),
    [...size, strength, radius, threshold]
  )

  useEffectPass(pass)

  return null
}
