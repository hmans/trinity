import { useEffect } from "react"
import { useState } from "react"
import { FC } from "react"
import { ReactorComponentProps } from "react-trinity"
import { Object3D } from "three"
import { init } from "../three-rapier-3d"

export const RapierLoader: FC<ReactorComponentProps<typeof Object3D>> = ({
  children
}) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!ready) init(() => setReady(true))
  }, [ready])

  return ready ? <>{children}</> : null
}
