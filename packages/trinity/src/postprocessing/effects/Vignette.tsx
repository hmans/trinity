import { FC, useMemo } from "react"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader"
import { useEffectPass } from "../useEffectPass"
import { useShaderUniforms } from "../useShaderUniforms"

export const Vignette: FC<{ offset?: number; darkness?: number }> = ({
  offset = 0.5,
  darkness = 2
}) => {
  const pass = useMemo(() => new ShaderPass(VignetteShader), [])
  useShaderUniforms(pass, { offset, darkness })
  useEffectPass(pass)

  return null
}
