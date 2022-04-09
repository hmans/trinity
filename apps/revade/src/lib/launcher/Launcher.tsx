import { FC, ReactNode, useState } from "react"
import * as Tone from "tone"
import "./Launcher.css"

export const Launcher: FC<{ children: ReactNode }> = ({ children }) => {
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
