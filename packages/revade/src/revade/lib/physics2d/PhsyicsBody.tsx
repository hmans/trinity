import T, { ReactorComponentProps } from "@hmans/trinity"
import p2 from "p2-es"
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react"
import mergeRefs from "react-merge-refs"
import { Euler, Group, Quaternion, Vector3 } from "three"
import { BodyContext } from "./BodyContext"
import { usePhysicsWorld } from "./PhysicsWorld"

const tmpVec3 = new Vector3()
const tmpQuat = new Quaternion()
const tmpEuler = new Euler()

export const PhysicsBody = forwardRef<
  Group,
  ReactorComponentProps<typeof Group> & {
    interpolate?: boolean
    mass?: number
    linearDamping?: number
    angularDamping?: number
    fixedRotation?: boolean
    onCollisionEnter?: Function
    onCollisionExit?: Function
    onCollisionStay?: Function
    userData?: any
  }
>(
  (
    {
      children,
      onCollisionEnter,
      onCollisionExit,
      onCollisionStay,
      mass = 1,
      interpolate = false,
      linearDamping = 0,
      angularDamping = 0,
      fixedRotation = false,
      userData,
      ...props
    },
    ref
  ) => {
    const { world, ecs, bodies } = usePhysicsWorld()
    const group = useRef<Group>(null!)

    const [body, setBody] = useState<p2.Body>()

    useEffect(() => {
      /* Get initial position */
      group.current.getWorldPosition(tmpVec3)

      /* Get initial rotation */
      group.current.getWorldQuaternion(tmpQuat)
      tmpEuler.setFromQuaternion(tmpQuat)

      const body = new p2.Body({
        mass,
        angularDamping,
        damping: linearDamping,
        fixedRotation,
        position: [tmpVec3.x, tmpVec3.y],
        angle: tmpEuler.z
      })

      world.addBody(body)
      setBody(body)

      /* Remove body from world when onmounting */
      return () => {
        world.removeBody(body)
        bodies.delete(body)
        setBody(undefined)
      }
    }, [])

    /* Create and destroy an ECS entity for this physics object */
    useEffect(() => {
      if (!body) return

      const entity = ecs.createEntity({
        physics2d: {
          transform: group.current,
          body,
          interpolate,
          onCollisionEnter,
          onCollisionExit,
          onCollisionStay,
          userData
        }
      })

      bodies.set(body, entity)

      return () => {
        ecs.destroyEntity(entity)
      }
    }, [body])

    return (
      <T.Group ref={mergeRefs([group, ref])} {...props}>
        {body && (
          <BodyContext.Provider value={body}>{children}</BodyContext.Provider>
        )}
      </T.Group>
    )
  }
)
