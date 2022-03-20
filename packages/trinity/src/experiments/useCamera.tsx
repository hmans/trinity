import { useEffect, useRef } from "react"
import { Camera } from "three"
import { useView } from "../engine/View"

export const useCamera = <T extends Camera = Camera>() => {
  const ref = useRef<T>(null!)
  const view = useView()

  useEffect(() => {
    ref.current.lookAt(0, 0, 0)
    view.setCamera(ref.current)
  }, [ref.current])

  return ref
}
