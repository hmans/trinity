import { useContext } from "react"
import { ParentContext } from "./ParentContext"

/**
 * Fetches the scene object that whatever we're rendering here will be
 * parented to.
 *
 * @returns The current parent.
 */

export const useParent = () => useContext(ParentContext)
