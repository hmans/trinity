import { useMemo } from "react"

type LoadingState = {
  promise: Promise<any>
  resource?: any
}

const loadingStates: Record<string, LoadingState> = {}

export const useLoader = <Resource extends any>(
  Loader: any,
  args: any
): Resource => {
  /* Fetch this request's state, if there is one */
  const id = useMemo(() => JSON.stringify(args), [])
  const state = loadingStates[id]

  /* If we don't have a state, we must initiate loading the requested resource. */
  if (!state) {
    const promise = new Promise((resolve: (data: Resource) => any) => {
      new Loader().load(args, resolve)
    }).then((resource) => {
      loadingStates[id].resource = resource
    })

    loadingStates[id] = { promise }

    throw promise
  }

  /* If we already have a resource, just return that. */
  if (state.resource) {
    return state.resource
  }

  /* Otherwise, re-throw the existing promise. */
  throw state.promise
}
