import { ReactNode, useEffect, useMemo } from "react"
import { useLoader } from "react-trinity/loaders"
import { Loader } from "three"
import {
  Compressor,
  Filter,
  now,
  Player,
  PolySynth,
  Synth,
  ToneAudioBuffer
} from "tone"

const comp = new Compressor(-30, 3).toDestination()

export const filter = new Filter(300, "lowpass").connect(comp)

export const pling = new PolySynth(Synth).connect(filter)
pling.volume.value = -8

export function playPickupSound() {
  const t = now()
  const offset = 1046.5 // C6
  pling.triggerAttackRelease(offset, "16n", t, 0.3)
  pling.triggerAttackRelease(
    offset * 2 + Math.random() * 50,
    "16n",
    t + 0.1,
    0.2
  )
}

export function playSplosionSound() {
  pling.triggerAttackRelease("C4", "8n")
}

class ToneLoader extends Loader {
  load(
    url: string,
    onLoad: (buffer: ToneAudioBuffer) => void,
    onProgress: any,
    onError: (error: Error) => void
  ) {
    new ToneAudioBuffer(url, onLoad, onError)
  }
}

export function Music({ children }: { children?: ReactNode }) {
  const buffer = useLoader(ToneLoader, "/audio/revade.mp3")

  const player = useMemo(() => new Player(buffer).connect(filter), [buffer])

  useEffect(() => {
    player.loop = true
    player.volume.value = -2
    player.start()

    return () => {
      player.stop()
    }
  }, [player])

  return <>{children}</>
}
