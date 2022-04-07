import { FC, useEffect, useState } from "react"
import "./Launcher.css"
import * as Tone from "tone"

export const Launcher: FC = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false)

  const onStart = () => {
    Tone.start().then(() => {
      setGameStarted(true)
    })
  }

  return gameStarted ? (
    <>{children}</>
  ) : (
    <div className="loader ready">
      <div className="button" onClick={onStart}>
        PLAY WINDOWED
      </div>
      <div className="button" onClick={onStart}>
        PLAY FULLSCREEN
      </div>
    </div>
  )
}
