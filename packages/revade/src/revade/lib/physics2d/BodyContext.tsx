import * as pl from "planck"
import { createContext, useContext } from "react"

export const BodyContext = createContext<pl.Body>(null!)

export const useBody = () => useContext(BodyContext)
