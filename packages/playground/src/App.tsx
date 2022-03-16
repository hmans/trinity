import { Engine } from "./trinity/engine/Engine"
import T from "./trinity"
import { useEffect, useRef } from "react"
import { Mesh } from "three"
import { useAnimationFrame } from "./trinity/engine/useAnimationFrame"

function Thingy() {
  const mesh = useRef<Mesh>(null!)

  useAnimationFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <T.Mesh ref={mesh}>
      <T.MeshStandardMaterial />
      <T.DodecahedronGeometry />
    </T.Mesh>
  )
}

function App() {
  return (
    <Engine>
      <Thingy />
    </Engine>
  )
}

export default App
