import { forwardRef, useEffect, useRef, useState } from "react"
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

const Renderer = forwardRef<
  THREE.WebGLRenderer,
  ReactorComponentProps<typeof THREE.WebGLRenderer>
>((props, ref) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const renderer = useRef<THREE.WebGLRenderer>(null!)

  return (
    <canvas ref={setCanvas}>
      {canvas && (
        <T.WebGLRenderer
          {...props}
          ref={mergeRefs([ref, renderer])}
          args={[{ canvas }]}
        >
          <OnWindowResize>
            {(renderer: THREE.WebGLRenderer) => {
              console.log(renderer)
              const width = window.innerWidth
              const height = window.innerHeight
              renderer.setSize(width, height)
            }}
          </OnWindowResize>
        </T.WebGLRenderer>
      )}
    </canvas>
  )
})

const App = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!)
  const scene = useRef<THREE.Scene>(null!)
  const renderer = useRef<THREE.WebGLRenderer>(null!)

  return (
    <Ticker>
      <Renderer ref={renderer} />

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
