import { useEffect, useState } from "react"

export const useLoader = <Resource extends any>(Loader: any, args: any) => {
  const [resource, setResource] = useState<Resource>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!resource && !loading) {
      setLoading(true)

      new Loader().load(args, (r: Resource) => {
        setLoading(false)
        setResource(r)
      })
    }
  }, [resource, loading])

  return resource
}
