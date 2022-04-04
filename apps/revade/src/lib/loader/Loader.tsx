import { FC, useEffect, useState } from "react"
import "./Loader.css"

export const Loader: FC = ({ children }) => {
  const [ready, setReady] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    setInterval(() => setReady(true), 1000)
  }, [])

  return gameStarted ? (
    <>{children}</>
  ) : ready ? (
    <div className="loader ready" onClick={() => setGameStarted(true)}>
      CLICK TO PLAY
    </div>
  ) : (
    <div className="loader">LOADING</div>
  )
}
