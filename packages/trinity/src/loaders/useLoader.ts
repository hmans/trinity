type ResourceEntry<T> = Promise<T> | T

const loadedResources: { [url: string]: ResourceEntry<any> } = {}

export const useLoader = <T extends object>(Loader: any, url: string): T => {
  /* If there's already a cached entry, return or throw it */
  if (loadedResources[url]) {
    if (loadedResources[url] instanceof Promise) {
      throw loadedResources[url]
    } else {
      return loadedResources[url] as T
    }
  }

  /* If we got here, it means that the resource has not been loaded, and there have been
  no previous attempts at loading it, so let's get to it! */

  /* Create a promise */
  const promise = new Promise((resolve: (data: T) => void) => {
    new Loader().load(url, resolve)
  })

  /* Cache it, so subsequent invocations of this method don't repeat it */
  loadedResources[url] = promise

  /* When the promise succeeds, replace the cached entry with its return value */
  promise.then((data) => {
    loadedResources[url] = data
  })

  /* Finally, throw the promise to trigger Suspense */
  throw promise
}
