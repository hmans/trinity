import T, { ReactorComponentProps, useTicker } from "@hmans/trinity"
import * as pl from "planck"
import { forwardRef, useEffect, useRef, useState } from "react"
import mergeRefs from "react-merge-refs"
import { Group, Vector3 } from "three"
import { ECS } from "../../state"
import { BodyContext } from "./BodyContext"
import { usePhysicsWorld } from "./PhysicsWorld"

const tmpVec3 = new Vector3()

export const DynamicBody = forwardRef<
  Group,
  ReactorComponentProps<typeof Group>
>(({ children, ...props }, ref) => {
  const world = usePhysicsWorld()
  const group = useRef<Group>(null!)

  const [body] = useState(() =>
    world.createBody({
      type: "dynamic",
      linearDamping: 0.5,
      angularDamping: 0.5
    })
  )

  useEffect(() => {
    /* Initialize the body with the scene object's transform */
    group.current.getWorldPosition(tmpVec3)
    body.setPosition(pl.Vec2(tmpVec3))

    /* Remove body from world when onmounting */
    return () => void world.destroyBody(body)
  }, [body])

  useTicker("fixed", () => {
    const pos = body.getPosition()
    const rot = body.getAngle()
    group.current.position.set(pos.x, pos.y, 0)
    group.current.rotation.set(0, 0, rot)
  })

  return (
    <T.Group ref={mergeRefs([group, ref])} {...props}>
      <BodyContext.Provider value={body}>
        <ECS.Component name="body" data={body} />
        {children}
      </BodyContext.Provider>
    </T.Group>
  )
})
