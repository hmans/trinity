import { useContext } from "react"
import { Object3D } from "three"
import { ParentContext } from "./ParentContext"

/**
 * Fetches the scene object that whatever we're rendering here will be
 * parented to.
 *
 * @returns The current parent.
 */

export const useParent = <T extends any = Object3D>() =>
  useContext(ParentContext) as T
