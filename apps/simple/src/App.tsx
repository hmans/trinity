import { forwardRef, useRef, useState } from "react"
import mergeRefs from "react-merge-refs"
import T from "react-trinity"
import { useWindowResizeHandler } from "react-trinity/src/engine/useWindowResizeHandler"
import { ReactorComponentProps, useParent } from "react-trinity/src/reactor"
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

const OnWindowResize = <T extends any = any>(props: {
  children: (parent: T) => void
}) => {
  const parent = useParent()

  useWindowResizeHandler(() => props.children(parent as any), [parent])

  return null
}

const App = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!)
  const scene = useRef<THREE.Scene>(null!)
  const renderer = useRef<THREE.WebGLRenderer>(null!)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  return (
    <Ticker>
      <canvas ref={setCanvas} />

      {canvas && (
        <T.WebGLRenderer ref={renderer} args={[{ canvas }]}>
          <OnWindowResize>
            {(renderer: THREE.WebGLRenderer) => {
              const width = window.innerWidth
              const height = window.innerHeight
              renderer.setSize(width, height)
            }}
          </OnWindowResize>
        </T.WebGLRenderer>
      )}

      <Update stage="render">
        {() => renderer.current.render(scene.current, camera.current)}
      </Update>

      <T.Scene ref={scene}>
        <T.PerspectiveCamera position={[0, 0, 10]} ref={camera}>
          <OnWindowResize>
            {(camera: THREE.PerspectiveCamera) => {
              const width = window.innerWidth
              const height = window.innerHeight

              camera.aspect = width / height
              camera.updateProjectionMatrix()
            }}
          </OnWindowResize>
        </T.PerspectiveCamera>

        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        <Thingy />
      </T.Scene>
    </Ticker>
  )
}

export default App
