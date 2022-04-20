import { FC, useEffect, useMemo } from "react"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader"
import { useView } from "../../engine/View"

export const Vignette: FC<{ offset?: number; darkness?: number }> = ({
  offset = 0.5,
  darkness = 2
}) => {
  /* Create pass */
  const pass = useMemo(() => new ShaderPass(VignetteShader), [])

  /* Apply uniforms */
  useEffect(() => {
    pass.uniforms["offset"].value = offset
    pass.uniforms["darkness"].value = darkness
  }, [pass, offset, darkness])

  /* Inject into composer */
  const { composer } = useView()
  useEffect(() => {
    composer.addPass(pass)
    return () => composer.removePass(pass)
  }, [composer, pass])

  return null
}
