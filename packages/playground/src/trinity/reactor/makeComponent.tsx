import { forwardRef, useEffect } from "react"
import { Material, Object3D, BufferGeometry, Mesh, Fog } from "three"
import { ParentContext, useParent } from "../engine/useParent"
import { Constructor, ReactorComponent } from "../types"
import { applyRef } from "../util/applyRef"
import { useManagedThreeObject } from "./useManagedThreeObject"

export const makeComponent = <Instance extends object>(
  constructor: Constructor<Instance>,
  displayName: string
): ReactorComponent<Instance> => {
  /* Create a component that wraps the requested constructible instance */
  const Component = forwardRef<Instance, { attach: string }>(({ children, attach }, ref) => {
    /* Get the current parent. */
    const parent = useParent()

    /* Create the instance of our THREE object. */
    const instance = useManagedThreeObject(() => new constructor())

    /* Apply forwarded ref */
    applyRef(ref, instance)

    /* Mount scene object to parent */
    useEffect(() => {
      if (!(instance instanceof Object3D)) return
      parent.add(instance)
      return () => void parent.remove(instance)
    }, [parent, instance])

    /* Attach to parent attributes */
    useEffect(() => {
      if (!instance) return

      /* For specific types, set a default attach property */
      if (!attach) {
        if (instance instanceof Material) attach = "material"
        else if (instance instanceof BufferGeometry) attach = "geometry"
        else if (instance instanceof Fog) attach = "fog"
      }

      /* If the instance has an "attach" property, attach it to the parent */
      /* TODO: improve types here */
      if (attach && attach in parent) {
        if ((parent as any)[attach] !== undefined) {
          ;(parent as any)[attach] = instance

          return () => void ((parent as any)[attach] = undefined)
        } else {
          console.error(
            `Property "${attach}" does not exist on parent "${instance.constructor.name}"`
          )
        }
      }
    }, [instance, attach])

    return <ParentContext.Provider value={instance}>{children}</ParentContext.Provider>
  })

  Component.displayName = displayName

  return Component
}
