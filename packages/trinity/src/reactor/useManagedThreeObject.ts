import { useConst } from "@hmans/react-toolbox"
import { useEffect } from "react"
import { Scene } from "three"
import type { Factory } from "./types"

/**
 * Manages the lifecycle of a THREE.* object instance, making sure it gets disposed once
 * the component using it is unmounted.
 */
export const useManagedThreeObject = <Instance = any>(
  fn: Factory<Instance>
) => {
  const instance = useConst<Instance>(fn)

  /* Automatically dispose the object if we can */
  useEffect(() => {
    if (!instance || instance instanceof Scene) return

    return () => {
      if ((instance as any).dispose) {
        (instance as any).dispose()
      }
    }
  }, [instance])

  return instance
}
