import { FC, useEffect, useMemo } from "react"
import { TextureLoader } from "three"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { useView } from "../../engine/View"
import { LensDirtShader } from "../shaders/LensDirtShader"

export const LensDirt: FC<{ texture: string; strength?: number }> = ({
  texture,
  strength = 1
}) => {
  const { composer } = useView()

  /* Create pass */
  const pass = useMemo(() => new ShaderPass(LensDirtShader), [])

  /* Apply uniforms */
  useEffect(() => {
    pass.uniforms["tDirt"].value = new TextureLoader().load(texture)
    pass.uniforms["strength"].value = strength
  }, [pass, texture, strength])

  /* Inject into composer */
  useEffect(() => {
    composer.addPass(pass)
    return () => composer.removePass(pass)
  }, [composer, pass])

  return null
}
