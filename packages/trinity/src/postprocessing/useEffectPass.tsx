import { useEffect } from "react"
import { Pass } from "three/examples/jsm/postprocessing/Pass"
import { useView } from "../engine/View"

export const useEffectPass = (pass: Pass) => {
  const { composer } = useView()

  useEffect(() => {
    composer.addPass(pass)
    return () => composer.removePass(pass)
  }, [composer, pass])
}
