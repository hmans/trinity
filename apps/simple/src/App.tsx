import { forwardRef, useEffect, useRef, useState } from "react"
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

const OnWindowResize = <
  T extends THREE.Object3D<THREE.Event> = THREE.Object3D<THREE.Event>
>({
  children
}: {
  children: (parent: T) => void
}) => {
  const parent = useParent()

  useWindowResizeHandler(() => children(parent as T), [parent])

  return null
}

const Camera = forwardRef<
  THREE.PerspectiveCamera,
  ReactorComponentProps<typeof THREE.PerspectiveCamera>
>((props, ref) => {
  const camera = useRef<THREE.PerspectiveCamera>(null!)
  useWindowResizeHandler(() => {}, [])

  return (
    <T.PerspectiveCamera {...props} ref={ref}>
      <OnWindowResize>
        {(camera: THREE.PerspectiveCamera) => {
          const width = window.innerWidth
          const height = window.innerHeight

          camera.aspect = width / height
          camera.updateProjectionMatrix()
        }}
      </OnWindowResize>
    </T.PerspectiveCamera>
  )
})

const App = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!)
  const scene = useRef<THREE.Scene>(null!)
  const renderer = useRef<THREE.WebGLRenderer>(null!)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const updateRendererSize = () => {
    if (renderer.current) {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.current.setSize(width, height)
    }
  }

  useEffect(updateRendererSize)

  useWindowResizeHandler(updateRendererSize, [renderer])

  return (
    <Ticker>
      <canvas ref={setCanvas} />
      {canvas && <T.WebGLRenderer ref={renderer} args={[{ canvas }]} />}

      <Update stage="render">
        {() => renderer.current.render(scene.current, camera.current)}
      </Update>

      <T.Scene ref={scene}>
        <Camera position={[0, 0, 10]} ref={camera} />
        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        <Thingy />
      </T.Scene>
    </Ticker>
  )
}

export default App
