import { createContext, useContext } from "react"

export const ParentContext = createContext<THREE.Object3D>(null!)

export const useParent = () => useContext(ParentContext)
