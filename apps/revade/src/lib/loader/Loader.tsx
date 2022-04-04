import { FC, useEffect, useState } from "react"
import "./Loader.css"
import * as Tone from "tone"

export const Loader: FC = ({ children }) => {
  const [ready, setReady] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    setInterval(() => setReady(true), 1000)
  }, [])

  const onStart = () => {
    Tone.start().then(() => {
      setGameStarted(true)
    })
  }

  return gameStarted ? (
    <>{children}</>
  ) : ready ? (
    <div className="loader ready" onClick={onStart}>
      CLICK TO PLAY
    </div>
  ) : (
    <div className="loader">LOADING</div>
  )
}
