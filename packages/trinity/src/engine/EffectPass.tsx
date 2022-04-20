import { useEffect, useMemo } from "react"
import { Pass } from "three/examples/jsm/postprocessing/Pass"
import { Constructor } from "../reactor"
import { useView } from "./View"

export const EffectPass = <PassConstructor extends Constructor<Pass>>(props: {
  pass: PassConstructor
  args: ConstructorParameters<PassConstructor>
}) => {
  const { composer } = useView()

  const pass = useMemo(() => new props.pass(...props.args), props.args)

  useEffect(() => {
    composer.addPass(pass)
    return () => composer.removePass(pass)
  }, [composer, pass])

  return null
}
