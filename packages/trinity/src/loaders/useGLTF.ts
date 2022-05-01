import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useLoader } from "./useLoader"

export const useGLTF = (url: string) => useLoader(GLTFLoader, url) as GLTF
