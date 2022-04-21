import { useEffect } from "react"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"

export const useShaderUniforms = (
  pass: ShaderPass,
  uniforms: Record<string, any>
) => {
  useEffect(() => {
    for (const uniform in uniforms) {
      pass.uniforms[uniform].value = uniforms[uniform]
    }
  }, [pass, ...Object.values(uniforms)])
}
