import { Engine } from "./trinity/engine/Engine"
import T from "./trinity"
import { useEffect, useRef } from "react"
import { Mesh } from "three"

function Thingy() {
  const mesh = useRef<Mesh>(null!)

  useEffect(() => {
    const tick = () => {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
      requestAnimationFrame(tick)
    }

    tick()
  }, [])

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
