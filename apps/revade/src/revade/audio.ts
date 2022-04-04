import { Compressor, Filter, now, Player, PolySynth, Synth } from "tone"

const comp = new Compressor(-30, 3).toDestination()

export const filter = new Filter(300, "lowpass").connect(comp)

export const music = new Player("/audio/revade.ogg").connect(filter)
music.autostart = false
music.loop = true
music.volume.value = -2

export const pling = new PolySynth(Synth).connect(filter)
pling.volume.value = -8

export function playPickupSound() {
  const t = now()
  const offset = 1046.5 // C6
  pling.triggerAttackRelease(offset, "16n", t, 1)
  pling.triggerAttackRelease(
    offset * 2 + Math.random() * 50,
    "16n",
    t + 0.1,
    0.5
  )
}

export function playSplosionSound() {
  pling.triggerAttackRelease("C4", "8n")
}
