import * as THREE from "three"
import { makeComponent } from "./makeComponent"
import { Constructor, ReactorComponent } from "../types"

type THREE = typeof THREE

type Reactor = {
  [K in keyof THREE]: THREE[K] extends Constructor
    ? ReactorComponent<InstanceType<THREE[K]>>
    : undefined
}

const cache = {} as Record<string, ReactorComponent<any>>

/**
 * The Trinity Reactor. For every class exposed by THREE, this object contains a
 * Trinity component that wraps the class (see `makeComponent`.)
 */
export const Reactor = new Proxy<Reactor>({} as Reactor, {
  get: (_, name: string) => {
    /* Create and memoize a wrapper component for the specified property. */
    if (!cache[name]) {
      /* Try and find a constructor within the THREE namespace. */
      const constructor = THREE[name as keyof THREE] as Constructor

      /* If nothing could be found, bail. */
      if (!constructor) return undefined

      /* Otherwise, create and memoize a component for that constructor. */
      cache[name] = makeComponent(constructor, name)
    }

    return cache[name]
  }
})