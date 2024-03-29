import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect
} from "react"
import { BufferGeometry, Fog, Material, Object3D } from "three"
import { applyProps } from "./lib/applyProps"
import { ParentContext } from "./ParentContext"
import {
  Constructor,
  IStringIndexable,
  ReactorComponent,
  ReactorComponentProps
} from "./types"
import { useManagedThreeObject } from "./useManagedThreeObject"
import { useParent } from "./useParent"

export const makeComponent = <
  TConstructor extends Constructor<any>,
  TInstance extends InstanceType<TConstructor>
>(
  constructor: TConstructor | undefined,
  displayName: string
): ReactorComponent<TConstructor> => {
  /* Create a component that wraps the requested constructible instance */
  const Component = forwardRef<TInstance, ReactorComponentProps<TConstructor>>(
    ({ object: propObject, children, attach, args, ...props }, ref) => {
      /* Get the current parent. */
      const parent = useParent() as IStringIndexable

      /* Create the instance of our THREE object. */
      const instance = useManagedThreeObject(
        () =>
          propObject ||
          new constructor!(...(Array.isArray(args) ? args : Array(args)))
      )

      /* Apply forwarded ref */
      useImperativeHandle(ref, () => instance)

      /* Apply props */
      if (props) applyProps(instance, props)

      /* Mount scene object to parent */
      useLayoutEffect(() => {
        if (!parent || !(instance instanceof Object3D)) return
        parent.add(instance)
        return () => void parent.remove(instance)
      }, [parent, instance])

      /* Attach to parent attributes */
      useLayoutEffect(() => {
        if (!parent || !instance) return

        /* For specific types, set a default attach property */
        if (!attach) {
          if (instance instanceof Material) attach = "material"
          else if (instance instanceof BufferGeometry) attach = "geometry"
          else if (instance instanceof Fog) attach = "fog"
        }

        /* If the instance has an "attach" property, attach it to the parent */
        if (attach) {
          if (attach in parent) {
            parent[attach] = instance

            return () => void (parent[attach!] = undefined)
          } else {
            console.error(
              `Property "${attach}" does not exist on parent "${parent.constructor.name}"`
            )
          }
        }
      }, [instance, attach])

      return (
        <ParentContext.Provider value={instance}>
          {typeof children === "function" ? children() : children}
        </ParentContext.Provider>
      )
    }
  )

  Component.displayName = displayName

  return Component
}
