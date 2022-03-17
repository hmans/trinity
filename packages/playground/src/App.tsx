import T, { Engine, makeInstanceComponents, Scene, useTicker } from "@hmans/trinity"
import { useRef } from "react"
import { Mesh } from "three"

const Things = makeInstanceComponents()

function Thingy() {
  const mesh = useRef<Mesh>(null!)

  useTicker("update", (dt) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 1 * dt
  })

  return (
    <T.Mesh ref={mesh}>
      <T.BoxGeometry args={[1, 2, 3]} />
      <T.MeshStandardMaterial color="red" />
    </T.Mesh>
  )
}

function App() {
  return (
    <Engine>
      <Scene>
        <Things.Root>
          <T.DodecahedronGeometry />
          <T.MeshStandardMaterial color="orange" />
        </Things.Root>

        <Things.Instance />

        <T.AmbientLight intensity={0.4} />
        <T.DirectionalLight color="white" intensity={0.8} />
        {/* <Thingy /> */}
      </Scene>
    </Engine>
  )
}

export default App
