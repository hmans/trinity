import { useRef } from "react"
import { DodecahedronGeometry, Mesh } from "three"
import T from "./trinity"
import { Engine } from "./trinity/engine/Engine"
import { useAnimationFrame } from "./trinity/engine/useAnimationFrame"

function Thingy() {
  const mesh = useRef<Mesh>(null!)

  useAnimationFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <T.Mesh ref={mesh}>
      <T.DodecahedronGeometry />
      <T.MeshStandardMaterial color="red" />
    </T.Mesh>
  )
}

function App() {
  return (
    <Engine>
      <T.DirectionalLight color="white" intensity={0.8} />
      <Thingy />
    </Engine>
  )
}

export default App
