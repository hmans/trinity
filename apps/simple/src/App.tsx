import { useEffect, useRef, useState } from "react"
import T from "react-trinity"
import { useWindowResizeHandler } from "react-trinity/src/engine/useWindowResizeHandler"
import { Ticker, Update } from "react-trinity/ticker"
import * as THREE from "three"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, mesh) => (mesh.rotation.x = mesh.rotation.y += speed * dt)}
  </Update>
)

const Thingy = () => (
  <T.Mesh>
    <T.DodecahedronGeometry />
    <T.MeshStandardMaterial color="hotpink" />
    <AutoRotate speed={1.5} />
  </T.Mesh>
)

const App = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!)
  const scene = useRef<THREE.Scene>(null!)
  const renderer = useRef<THREE.WebGLRenderer>(null!)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const updateRendererSize = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    if (renderer.current) {
      renderer.current.setSize(width, height)
    }

    if (camera.current) {
      camera.current.aspect = width / height
      camera.current.updateProjectionMatrix()
    }
  }

  useEffect(updateRendererSize)

  useWindowResizeHandler(updateRendererSize, [renderer, camera])

  return (
    <Ticker>
      <canvas ref={setCanvas} />
      {canvas && <T.WebGLRenderer ref={renderer} args={[{ canvas }]} />}

      <Update stage="render">
        {() => renderer.current.render(scene.current, camera.current)}
      </Update>

      <T.Scene ref={scene}>
        <T.PerspectiveCamera position={[0, 0, 10]} ref={camera} />
        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        <Thingy />
      </T.Scene>
    </Ticker>
  )
}

export default App
