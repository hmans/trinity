import { CubeTexture, CubeTextureLoader } from "three"
import { useLoader } from "./useLoader"

export const useCubeTexture = (urls: string[]): CubeTexture | undefined =>
  useLoader<CubeTexture>(CubeTextureLoader, urls)
