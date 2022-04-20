import { useEffect } from "react"
import { Pass } from "three/examples/jsm/postprocessing/Pass"
import { Constructor } from "../reactor"
import { useView } from "./View"

export const EffectPass = <PassConstructor extends Constructor<Pass>>(props: {
  pass: PassConstructor
  args: ConstructorParameters<PassConstructor>
}) => {
  const { composer } = useView()

  useEffect(() => {
    console.log("creating effect pass:", props)

    const pass = new props.pass(...props.args)
    composer.addPass(pass)
    return () => composer.removePass(pass)
  }, [composer, props.pass])

  return null
}
