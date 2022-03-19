import T, { ReactorComponentProps } from "@hmans/trinity"
import * as pl from "planck"
import { forwardRef, useEffect, useRef, useState } from "react"
import mergeRefs from "react-merge-refs"
import { Group, Vector3 } from "three"
import { BodyContext } from "./BodyContext"
import { usePhysicsWorld } from "./PhysicsWorld"

const tmpVec3 = new Vector3()

export const DynamicBody = forwardRef<
  Group,
  ReactorComponentProps<typeof Group> & {
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
      linearDamping = 0,
      angularDamping = 0,
      fixedRotation = false,
      ...props
    },
    ref
  ) => {
    const { world, ecs } = usePhysicsWorld()
    const group = useRef<Group>(null!)

    const [body] = useState(() =>
      world.createBody({
        type: "dynamic",
        linearDamping,
        angularDamping,
        fixedRotation
      })
    )

    useEffect(() => {
      /* Initialize the body with the scene object's transform */
      group.current.getWorldPosition(tmpVec3)
      body.setPosition(pl.Vec2(tmpVec3))

      /* Remove body from world when onmounting */
      return () => void world.destroyBody(body)
    }, [])

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

      body.setUserData(entity)

      return () => ecs.destroyEntity(entity)
    }, [])

    return (
      <T.Group ref={mergeRefs([group, ref])} {...props}>
        <BodyContext.Provider value={body}>{children}</BodyContext.Provider>
      </T.Group>
    )
  }
)
