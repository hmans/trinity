import { FC, forwardRef, useEffect, useRef, useState } from "react"
import { Group, Quaternion, Vector3 } from "three"
import { usePhysicsWorld } from "./PhysicsWorld"
import T, { useTicker } from "@hmans/trinity"
import { Vec2 } from "planck"
import mergeRefs from "react-merge-refs"

const tmpVec3 = new Vector3()

export const DynamicBody = forwardRef(({ children }, ref) => {
  const world = usePhysicsWorld()
  const group = useRef<Group>(null!)

  const [body] = useState(() => world.createDynamicBody())

  useEffect(() => {
    /* Initialize the body with the scene object's transform */
    group.current.getWorldPosition(tmpVec3)
    body.setPosition(Vec2(tmpVec3))

    /* Remove body from world when onmounting */
    return () => void world.destroyBody(body)
  }, [body])

  useTicker("fixed", () => {
    const pos = body.getPosition()
    group.current.position.set(pos.x, pos.y, 0)
  })

  return <T.Group ref={mergeRefs([group, ref])}>{children}</T.Group>
})
