import { FC, useMemo } from "react"
import { TextureLoader } from "three"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { LensDirtShader } from "../shaders/LensDirtShader"
import { useEffectPass } from "../useEffectPass"
import { useShaderUniforms } from "../useShaderUniforms"

export const LensDirt: FC<{ texture: string; strength?: number }> = ({
  texture,
  strength = 1
}) => {
  const pass = useMemo(() => new ShaderPass(LensDirtShader), [])
  const tDirt = useMemo(() => new TextureLoader().load(texture), [texture])

  useShaderUniforms(pass, { tDirt, strength })
  useEffectPass(pass)

  return null
}
