import * as RAPIER from "@dimforge/rapier3d-compat"
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import T, { useTicker } from "react-trinity"
import { Object3D } from "three"
import * as miniplex from "miniplex"
import { World } from "miniplex"
import { useMemo } from "react"

export const PhysicsWorldContext = createContext<{
  world: RAPIER.World
  ecs: miniplex.World<PhysicsEntity>
}>(null!)

export const usePhysics = () => useContext(PhysicsWorldContext)

export type PhysicsEntity = {
  rigidBody?: RAPIER.RigidBody
  transform: Object3D
}

type PhysicsWorldProps = {
  children?: ReactNode
}

export const PhysicsWorld: FC<PhysicsWorldProps> = ({ children }) => {
  const group = useRef<Object3D>(null!)
  const world = createWorld()
  const ecs = createECS()

  const archetypes = useMemo(
    () =>
      ecs && {
        bodies: ecs.archetype("transform", "rigidBody")
      },
    [ecs]
  )

  useTicker("physics", () => {
    if (!world || !archetypes) return

    world?.step()

    /* Transfer transform data from physics world to scene */
    for (const { rigidBody, transform } of archetypes!.bodies.entities) {
      const t = rigidBody.translation(),
        q = rigidBody.rotation()

      transform.position.set(t.x, t.y, t.z)
      transform.quaternion.set(q.x, q.y, q.z, q.w)
    }
  })

  return (
    <T.Object3D ref={group}>
      {world && ecs && (
        <PhysicsWorldContext.Provider value={{ world, ecs }}>
          {children}
        </PhysicsWorldContext.Provider>
      )}
    </T.Object3D>
  )
}

const createWorld = () => {
  const [world, setWorld] = useState<RAPIER.World>()

  useEffect(() => {
    setWorld(new RAPIER.World({ x: 0, y: -9.81, z: 0 }))
    return () => setWorld(undefined)
  }, [])

  return world
}

const createECS = () => {
  const [ecs, setECS] = useState<miniplex.World<PhysicsEntity>>()

  useEffect(() => {
    setECS(() => new miniplex.World<PhysicsEntity>())

    return () => {
      if (ecs) ecs.clear()
      setECS(undefined)
    }
  }, [])

  return ecs
}
