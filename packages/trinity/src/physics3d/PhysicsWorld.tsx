import * as RAPIER from "@dimforge/rapier3d-compat"
import * as miniplex from "miniplex"
import { World } from "miniplex"
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import { Object3D, Vector3 } from "three"
import T, { useTicker } from ".."

export type CollisionCallback = (other: RAPIER.ColliderHandle) => void

export type PhysicsState = {
  world: RAPIER.World
  ecs: miniplex.World<PhysicsEntity>
  collisionCallbacks: Record<number, CollisionCallback>
}

export type PhysicsEntity = {
  rigidBody?: RAPIER.RigidBody
  transform: Object3D
}

type PhysicsWorldProps = {
  children?: ReactNode
  gravity?: [number, number, number]
}

export const PhysicsWorldContext = createContext<PhysicsState>(null!)

export const usePhysics = () => useContext(PhysicsWorldContext)

export const PhysicsWorld: FC<PhysicsWorldProps> = ({ children, gravity }) => {
  const group = useRef<Object3D>(null!)

  const [state] = useState<PhysicsState>(() => ({
    world: new RAPIER.World(new RAPIER.Vector3(0, -9.81, 0)),
    ecs: new miniplex.World<PhysicsEntity>(),
    collisionCallbacks: {}
  }))

  /* Apply updated props */
  useEffect(() => {
    if (gravity) {
      state.world.gravity.x = gravity[0]
      state.world.gravity.y = gravity[1]
      state.world.gravity.z = gravity[2]
    }
  })

  const archetypes = useMemo(
    () => ({
      bodies: state.ecs.archetype("transform", "rigidBody")
    }),
    [state.ecs]
  )

  const eventQueue = useMemo(() => new RAPIER.EventQueue(true), [])

  useTicker("physics", () => {
    state.world.step(eventQueue)

    eventQueue.drainCollisionEvents((handle1, handle2, started) => {
      state.collisionCallbacks[handle1]?.(handle2)
      state.collisionCallbacks[handle2]?.(handle1)
    })

    /* Transfer transform data from physics world to scene */
    for (const { rigidBody, transform } of archetypes!.bodies.entities) {
      /* Skip if body is sleeping */
      if (rigidBody.isSleeping()) return

      /* Copy position */
      const t = rigidBody.translation()
      transform.position.set(t.x, t.y, t.z)

      /* Copy rotation */
      const q = rigidBody.rotation()
      transform.quaternion.set(q.x, q.y, q.z, q.w)
    }
  })

  return (
    <T.Object3D ref={group}>
      {state && (
        <PhysicsWorldContext.Provider value={state}>
          {children}
        </PhysicsWorldContext.Provider>
      )}
    </T.Object3D>
  )
}
