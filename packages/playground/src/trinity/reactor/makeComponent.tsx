import { forwardRef, useEffect } from "react"
import { Material, Object3D, BufferGeometry, Mesh } from "three"
import { ParentContext, useParent } from "../engine/useParent"
import { Constructor, ReactorComponent } from "../types"
import { applyRef } from "../util/applyRef"
import { useManagedThreeObject } from "./useManagedThreeObject"

export const makeComponent = <Instance extends object>(
  constructor: Constructor<Instance>,
  displayName: string
): ReactorComponent<Instance> => {
  /* Create a component that wraps the requested constructible instance */
  const Component = forwardRef<Instance>(({ children }, ref) => {
    /* Get the current parent. */
    const parent = useParent()

    /* Create the instance of our THREE object. */
    const instance = useManagedThreeObject(() => new constructor())

    /* Apply forwarded ref */
    applyRef(ref, instance)

    /* Mount object */
    useEffect(() => {
      switch (true) {
        case instance instanceof Object3D:
          parent.add(instance)

          return () => {
            parent.remove(instance)
          }

        case instance instanceof Material:
          if (!(parent instanceof Mesh)) return

          parent.material = instance

          return () => {
            parent.material = null
          }

        case instance instanceof BufferGeometry:
          if (!(parent instanceof Mesh)) return

          parent.geometry = instance

          return () => {
            parent.geometry = null
          }
      }
    }, [instance, parent])

    return <ParentContext.Provider value={instance}>{children}</ParentContext.Provider>
  })

  Component.displayName = displayName

  return Component
}
