import * as RAPIER from "@dimforge/rapier3d-compat"
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import mergeRefs from "react-merge-refs"
import { BufferGeometry, Object3D, Vector3 } from "three"
import T, { ReactorComponentProps } from ".."
import { usePhysics } from "./PhysicsWorld"
import { useRigidBody } from "./RigidBody"

type ColliderProps = {
  children?: ReactNode
}

export const Collider = forwardRef<
  Object3D,
  ColliderProps &
    Omit<ReactorComponentProps<typeof Object3D>, "args"> & {
      factory: (...args: any[]) => RAPIER.ColliderDesc | null
      args: any[]
    }
>(({ factory, args, ...props }, ref) => {
  const { world } = usePhysics()
  const { rigidBody } = useRigidBody()

  useEffect(() => {
    const desc = factory(...args)
    if (!desc)
      throw new Error(`Could not build a collider with descriptor: ${desc}`)

    const collider = world.createCollider(desc, rigidBody.handle)

    return () => {
      if (collider && world.colliders.contains(collider.handle))
        world.removeCollider(collider, true)
    }
  }, [rigidBody, world])

  return <T.Object3D {...props} ref={ref} />
})

export const BoxCollider = forwardRef<
  Object3D,
  ColliderProps & ReactorComponentProps<typeof Object3D>
>((props, ref) => (
  <Collider
    factory={RAPIER.ColliderDesc.cuboid}
    args={[2, 2, 2]}
    ref={ref}
    {...props}
  />
))

export const SphereCollider = forwardRef<
  Object3D,
  ColliderProps & ReactorComponentProps<typeof Object3D>
>((props, ref) => (
  <Collider
    factory={RAPIER.ColliderDesc.ball}
    args={[0.5]}
    ref={ref}
    {...props}
  />
))

export const ConvexHullCollider = forwardRef<
  Object3D,
  ColliderProps &
    ReactorComponentProps<typeof Object3D> & { geometry: BufferGeometry }
>(({ geometry, ...props }, ref) => {
  const object = useRef<Object3D>(null!)
  const [scaledPoints, setScaledPoints] = useState<Float32Array>()

  useEffect(() => {
    if (!object.current) return

    const points = geometry.attributes.position.array as Float32Array
    const scale = new Vector3()
    object.current.getWorldScale(scale)

    setScaledPoints(scalePoints(points, scale))
  }, [geometry])

  return (
    <T.Object3D ref={object}>
      {scaledPoints ? (
        <Collider
          factory={() => RAPIER.ColliderDesc.convexHull(scaledPoints!)}
          args={[]}
          ref={ref}
          {...props}
        />
      ) : null}{" "}
    </T.Object3D>
  )
})

export const scalePoints = (
  points: Float32Array,
  scale: { x: number; y: number; z: number }
) => {
  const scaledPoints = points.slice()

  for (let i = 0; i < scaledPoints.length; i += 3) {
    scaledPoints[i] *= scale.x
    scaledPoints[i + 1] *= scale.y
    scaledPoints[i + 2] *= scale.z
  }

  return scaledPoints
}
