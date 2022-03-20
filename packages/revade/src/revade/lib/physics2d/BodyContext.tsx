import p2 from "p2-es"
import { createContext, useContext } from "react"

export const BodyContext = createContext<p2.Body>(null!)

export const useBody = () => useContext(BodyContext)
