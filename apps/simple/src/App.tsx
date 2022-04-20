import { FC, MutableRefObject, useEffect, useMemo, useRef } from "react"
import T, { Renderer } from "react-trinity"
import { useRenderer } from "react-trinity/src/engine/Renderer"
import { useWindowResizeHandler } from "react-trinity/src/engine/useWindowResizeHandler"
import { Ticker, Update, useTicker } from "react-trinity/ticker"
import * as THREE from "three"

const AutoRotate = ({ speed = 1 }) => (
  <Update>
    {(dt, { parent }) => (parent.rotation.x = parent.rotation.y += speed * dt)}
  </Update>
)

const EventHandling: FC<{
  camera: MutableRefObject<THREE.Camera>
  scene: MutableRefObject<THREE.Scene>
}> = ({ camera, scene }) => {
  const renderer = useRenderer()
  const pointer = useMemo(() => new THREE.Vector2(), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const intersects = new Array<THREE.Intersection<THREE.Object3D<Event>>>()

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      /* Get normalized pointer position */
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

      /* Prepare raycaster */
      raycaster.setFromCamera(pointer, camera.current)

      /* Find intersects */
      intersects.length = 0
      raycaster.intersectObject(scene.current, true, intersects)
    }

    const handleClick = (e: PointerEvent) => {
      console.log(intersects[0])
    }

    /* Register/unregister event handlers */
    renderer.domElement.addEventListener("pointermove", handleMove)
    renderer.domElement.addEventListener("pointerdown", handleClick)

    return () => {
      renderer.domElement.removeEventListener("pointermove", handleMove)
      renderer.domElement.removeEventListener("pointerdown", handleClick)
    }
  }, [renderer, camera, scene])

  return null
}

const On: FC<{ event: string; target?: any; children: Function }> = ({
  target = window,
  event,
  children
}) => {
  useEffect(() => {
    target.addEventListener(event, children)
    return () => target.removeEventListener(event, children)
  }, [event, target, children])

  return null
}

const OnWindowResize: FC<{ children: Function }> = ({ children }) => {
  /* Invoke the function at least once */
  useEffect(() => children(), [])

  /* Bind it to the window's resize event */
  return <On event="resize" target={window} children={children} />
}

const View: FC<{
  scene: MutableRefObject<THREE.Scene>
  camera: MutableRefObject<THREE.Camera>
}> = ({ scene, camera }) => (
  <>
    <Update stage="render">
      {(_, { renderer }) => renderer.render(scene.current, camera.current)}
    </Update>

    <EventHandling scene={scene} camera={camera} />

    <OnWindowResize>
      {() => {
        const width = window.innerWidth
        const height = window.innerHeight

        if (camera.current instanceof THREE.PerspectiveCamera) {
          camera.current.aspect = width / height
          camera.current.updateProjectionMatrix()
        }
      }}
    </OnWindowResize>
  </>
)

const App = () => {
  const scene = useRef<THREE.Scene>(null!)
  const camera = useRef<THREE.PerspectiveCamera>(null!)

  return (
    <Ticker>
      <Renderer>
        {/* The view actually takes care of rendering, event handling, etc. */}
        <View scene={scene} camera={camera} />

        {/* The scene, with some objects, and a camera */}
        <T.Scene ref={scene}>
          <T.PerspectiveCamera position={[0, 0, 10]} ref={camera} />

          <T.AmbientLight intensity={0.2} />
          <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

          <T.Mesh>
            <T.DodecahedronGeometry />
            <T.MeshStandardMaterial color="hotpink" />
            <AutoRotate speed={1.5} />
          </T.Mesh>
        </T.Scene>
      </Renderer>
    </Ticker>
  )
}

export default App
