import { makeComponent } from "./makeComponent"
import type { Constructor, ReactorComponent } from "./types"

type Reactor<Source> = {
  [K in keyof Source]: Source[K] extends Constructor
    ? ReactorComponent<Source[K]>
    : undefined
}

const cache = {} as Record<string, ReactorComponent<any, any>>

/**
 * The Trinity Reactor. For every class exposed by THREE, this object contains a
 * Trinity component that wraps the class (see `makeComponent`.)
 */

export function makeReactor<Source>(source: Source): Reactor<Source> {
  return new Proxy<Reactor<Source>>({} as Reactor<Source>, {
    get: (_, name: string) => {
      /* Create and memoize a wrapper component for the specified property. */
      if (!cache[name]) {
        /* Try and find a constructor within the THREE namespace. */
        const constructor = source[name as keyof Source] as Constructor

        /* If nothing could be found, bail. */
        if (!constructor) return undefined

        /* Otherwise, create and memoize a component for that constructor. */
        cache[name] = makeComponent(constructor, name)
      }

      return cache[name]
    }
  })
}
