import React, { forwardRef, ReactNode, useMemo } from "react"
import { Object3D } from "three"
import { getAllJSDocTagsOfKind } from "typescript"
import T, { ReactorComponentProps } from "../reactor"
import { useGLTF } from "./useGLTF"

export const GLTFAsset = forwardRef<
  Object3D,
  { children?: ReactNode; url: string } & ReactorComponentProps<typeof Object3D>
>(({ url, ...props }, ref) => {
  const gltf = useGLTF(url)

  const clonedScene = useMemo(() => gltf.scene.clone(), [gltf])

  return <T.Object3D ref={ref} object={clonedScene} {...props} />
})
