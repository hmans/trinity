import { useRef, useState } from "react"
import T, { Renderer } from "react-trinity"
import { useWindowResizeHandler } from "react-trinity/src/engine/useWindowResizeHandler"
import { useParent } from "react-trinity/src/reactor"
import { Ticker, Update } from "react-trinity/ticker"
import * as THREE from "three"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, { parent }) => (parent.rotation.x = parent.rotation.y += speed * dt)}
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
  const scene = useRef<THREE.Scene>(null!)

  return (
    <Ticker>
      <Renderer>
        {/* The scene, with some objects, and a camera */}
        <T.Scene ref={scene}>
          <T.PerspectiveCamera position={[0, 0, 10]}>
            {/* Handle window resizing */}
            <OnWindowResize>
              {(camera: THREE.PerspectiveCamera) => {
                const width = window.innerWidth
                const height = window.innerHeight

                camera.aspect = width / height
                camera.updateProjectionMatrix()
              }}
            </OnWindowResize>

            {/* Our actual rendering code */}
            <Update stage="render">
              {(_, { parent: camera, renderer }) =>
                renderer.render(
                  scene.current,
                  camera as THREE.PerspectiveCamera
                )
              }
            </Update>
          </T.PerspectiveCamera>

          <T.AmbientLight intensity={0.2} />
          <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

          <Thingy />
        </T.Scene>
      </Renderer>
    </Ticker>
  )
}

export default App
