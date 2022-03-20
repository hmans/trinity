import T, { ReactorComponentProps } from "@hmans/trinity"
import p2 from "p2-es"
import { forwardRef, useEffect, useRef, useState } from "react"
import mergeRefs from "react-merge-refs"
import { Group, Vector3 } from "three"
import { BodyContext } from "./BodyContext"
import { usePhysicsWorld } from "./PhysicsWorld"

const tmpVec3 = new Vector3()

export const PhysicsBody = forwardRef<
  Group,
  ReactorComponentProps<typeof Group> & {
    mass?: number
    linearDamping?: number
    angularDamping?: number
    fixedRotation?: boolean
    onCollisionEnter?: Function
    onCollisionExit?: Function
    onCollisionStay?: Function
  }
>(
  (
    {
      children,
      onCollisionEnter,
      onCollisionExit,
      onCollisionStay,
      mass = 1,
      linearDamping = 0,
      angularDamping = 0,
      fixedRotation = false,
      ...props
    },
    ref
  ) => {
    const { world, ecs, bodies } = usePhysicsWorld()
    const group = useRef<Group>(null!)

    const [body] = useState(
      () =>
        new p2.Body({
          mass,
          angularDamping,
          damping: linearDamping,
          fixedRotation
        })
    )

    useEffect(() => {
      /* Initialize the body with the scene object's transform */
      group.current.getWorldPosition(tmpVec3)
      body.position = [tmpVec3.x, tmpVec3.y]
      world.addBody(body)

      /* Remove body from world when onmounting */
      return () => void world.removeBody(body)
    }, [])

    /* Create and destroy an ECS entity for this physics object */
    useEffect(() => {
      const entity = ecs.createEntity({
        physics2d: {
          transform: group.current,
          body,
          onCollisionEnter,
          onCollisionExit,
          onCollisionStay
        }
      })

      bodies.set(body, entity)

      return () => {
        bodies.delete(body)
        ecs.destroyEntity(entity)
      }
    }, [])

    return (
      <T.Group ref={mergeRefs([group, ref])} {...props}>
        <BodyContext.Provider value={body}>{children}</BodyContext.Provider>
      </T.Group>
    )
  }
)
