import { useEffect } from "react"
import { Pass } from "three/examples/jsm/postprocessing/Pass"
import { useComposer } from "../engine"

export const useEffectPass = (pass: Pass) => {
  const composer = useComposer()

  useEffect(() => {
    composer.addPass(pass)
    return () => composer.removePass(pass)
  }, [composer, pass])
}
