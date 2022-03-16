import { useRef, useEffect, FC } from "react"
import * as THREE from "three"
import { useConst } from "../util/useConst"
import { ParentContext } from "./useParent"

export const Engine: FC = ({ children }) => {
  const canvas = useRef<HTMLCanvasElement>(null!)
  const scene = useConst(() => new THREE.Scene())

  useEffect(() => {
    const el = canvas.current

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas: el })
    renderer.setSize(el.clientWidth, el.clientHeight)

    /* Three Devtools */
    const devtools = (window as any).__THREE_DEVTOOLS__
    if (typeof devtools !== "undefined") {
      devtools.dispatchEvent(new CustomEvent("observe", { detail: scene }))
      devtools.dispatchEvent(new CustomEvent("observe", { detail: renderer }))
    }

    /* Camera */
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000)
    camera.position.z = 10

    /* Lights */
    scene.add(new THREE.AmbientLight())

    /* Cube */
    const cube = new THREE.Mesh()
    cube.geometry = new THREE.DodecahedronGeometry()
    cube.material = new THREE.MeshStandardMaterial({ color: "hotpink" })
    cube.position.x = -5
    scene.add(cube)

    /* Render loop */
    let looping = true
    const tick = () => {
      cube.rotation.x = cube.rotation.y += 0.01

      /* Render */
      renderer.render(scene, camera)
      if (looping) requestAnimationFrame(tick)
    }

    tick()

    return () => {
      looping = false
      scene.clear()
    }
  }, [])

  return (
    <canvas ref={canvas}>
      <ParentContext.Provider value={scene}>{children}</ParentContext.Provider>
    </canvas>
  )
}
