import React, { forwardRef, ReactNode } from "react"
import { Object3D } from "three"
import T from "../reactor"
import { useGLTF } from "./useGLTF"

export const GLTFAsset = forwardRef<
  Object3D,
  { children?: ReactNode; url: string }
>(({ url, ...props }, ref) => {
  const gltf = useGLTF(url)
  return <T.Object3D ref={ref} object={gltf.scene} {...props} />
})
