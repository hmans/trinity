import React, { forwardRef, useLayoutEffect } from "react"
import { BufferGeometry, Fog, Material, Object3D } from "three"
import { ParentContext, useParent } from "../engine/useParent"
import { applyProps } from "./lib/applyProps"
import { applyRef } from "./lib/applyRef"
import { ReactorComponent, ReactorComponentProps } from "./types"
import type { Constructor, StringIndexable } from "./types/utilities"
import { useManagedThreeObject } from "./useManagedThreeObject"

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
      const parent = useParent() as StringIndexable

      /* Create the instance of our THREE object. */
      const instance = useManagedThreeObject(
        () =>
          propObject ||
          new constructor!(...(Array.isArray(args) ? args : Array(args)))
      )

      /* Apply forwarded ref */
      applyRef(ref, instance)

      /* Apply props */
      if (props) applyProps(instance, props)

      /* Mount scene object to parent */
      useLayoutEffect(() => {
        if (!(instance instanceof Object3D)) return
        parent.add(instance)
        return () => void parent.remove(instance)
      }, [parent, instance])

      /* Attach to parent attributes */
      useLayoutEffect(() => {
        if (!instance) return

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
