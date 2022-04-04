import { FC } from "react"
import "./Loader.css"

const LoadScreen: FC = () => {
  return <div className="loader">LOADING</div>
}

export const Loader: FC = ({ children }) => {
  return <LoadScreen />
}
