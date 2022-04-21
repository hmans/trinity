import { useEffect, useMemo } from "react"
import { Pass } from "three/examples/jsm/postprocessing/Pass"
import { useComposer } from "../engine"
import { Constructor } from "../reactor"

export const EffectPass = <PassConstructor extends Constructor<Pass>>(props: {
  pass: PassConstructor
  args: ConstructorParameters<PassConstructor>
}) => {
  const composer = useComposer()

  const pass = useMemo(() => new props.pass(...props.args), props.args)

  useEffect(() => {
    composer.addPass(pass)
    return () => composer.removePass(pass)
  }, [composer, pass])

  return null
}
