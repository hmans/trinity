import { FC, useEffect, useState } from "react"
import "./Launcher.css"
import * as Tone from "tone"

export const Launcher: FC = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false)

  const onStart = async () => {
    await Tone.start()
    setGameStarted(true)
  }

  const onFullscreenStart = () => {
    const $el = document.documentElement
    if ("webkitRequestFullscreen" in $el) ($el as any).webkitRequestFullscreen()
    else $el.requestFullscreen()

    onStart()
  }

  return gameStarted ? (
    <>{children}</>
  ) : (
    <div className="loader ready">
      <div className="button" onClick={onStart}>
        PLAY WINDOWED
      </div>

      <div className="button" onClick={onFullscreenStart}>
        PLAY FULLSCREEN
      </div>
    </div>
  )
}
