import { useRef } from "react"
import { Mesh } from "three"
import T, { useTicker } from "@hmans/trinity"
import { Engine } from "@hmans/trinity"
import { useAnimationFrame } from "@hmans/trinity"

function Thingy() {
  const mesh = useRef<Mesh>(null!)

  useTicker("update", (dt) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 1 * dt
  })

  return (
    <T.Mesh ref={mesh} position={[1, 2, 3]}>
      <T.BoxGeometry args={[1, 2, 3]} />
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
