import React, { forwardRef, useEffect } from "react"
import { Material, Object3D, BufferGeometry, Mesh, Fog } from "three"
import { ParentContext, useParent } from "../engine/useParent"
import { ReactorComponent, ReactorComponentProps } from "./types"
import { applyProps } from "../lib/applyProps"
import { applyRef } from "../lib/applyRef"
import { useManagedThreeObject } from "./useManagedThreeObject"
import { Constructor, StringIndexable } from "../lib/type"

export const makeComponent = <
  TConstructor extends Constructor<any>,
  TInstance extends InstanceType<TConstructor>
>(
  constructor: TConstructor,
  displayName: string
): ReactorComponent<TConstructor> => {
  /* Create a component that wraps the requested constructible instance */
  const Component = forwardRef<TInstance, ReactorComponentProps<TConstructor>>(
    ({ children, attach, args, ...props }, ref) => {
      /* Get the current parent. */
      const parent = useParent() as StringIndexable

      /* Create the instance of our THREE object. */
      const instance = useManagedThreeObject(
        () => new constructor(...(Array.isArray(args) ? args : Array(args)))
      )

      /* Apply forwarded ref */
      applyRef(ref, instance)

      /* Apply props every time they change */
      useEffect(() => {
        /* Assign props */
        if (props) applyProps(instance, props)
      }, [instance, props])

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
