import p2 from "p2-es"
import { FC, useEffect, useMemo } from "react"
import { useBody } from "./BodyContext"
import { Entity } from "./Entity"
import { usePhysicsWorld } from "./PhysicsWorld"

type ShapeProps = {
  sensor?: boolean
  offset?: [number, number]
  collisionGroup?: number
  collisionMask?: number
  onBeginContact?: (entity: Entity) => void
  onEndContact?: (entity: Entity) => void
}

export const Shape: FC<ShapeProps & { shape: p2.Shape }> = ({
  children,
  collisionGroup,
  collisionMask,
  onBeginContact,
  onEndContact,
  sensor,
  shape,
  offset = [0, 0]
}) => {
  const body = useBody()
  const { bodies } = usePhysicsWorld()

  useEffect(() => {
    shape.collisionGroup = collisionGroup || 1
    shape.collisionMask = collisionMask || 1
    shape.sensor = !!sensor

    body.addShape(shape, offset)
    return () => void body.removeShape(shape)
  }, [])

  /* Register contact callbacks */
  useEffect(() => {
    if (!onBeginContact) return

    body.world.on("beginContact", (e: p2.BeginContactEvent) => {
      const entityA = bodies.get(e.shapeA.body)
      const entityB = bodies.get(e.shapeB.body)

      if (e.shapeA === shape && entityB) onBeginContact(entityB)
      if (e.shapeB === shape && entityA) onBeginContact(entityA)
    })
  })

  useEffect(() => {
    if (!onEndContact) return

    body.world.on("endContact", (e: p2.EndContactEvent) => {
      const entityA = bodies.get(e.shapeA.body)
      const entityB = bodies.get(e.shapeB.body)

      if (e.shapeA === shape && entityB) onEndContact(entityB)
      if (e.shapeB === shape && entityA) onEndContact(entityA)
    })
  })

  return <>{children}</>
}

export const CircleShape: FC<ShapeProps & { radius?: number }> = ({
  radius = 1,
  ...props
}) => {
  const shape = useMemo(() => new p2.Circle({ radius }), [radius])
  return <Shape shape={shape} {...props} />
}

export const BoxShape: FC<ShapeProps & { size?: [number, number] }> = ({
  size = [0.5, 0.5],
  ...props
}) => {
  const shape = useMemo(
    () => new p2.Box({ width: size[0], height: size[1] }),
    [...size]
  )
  return <Shape shape={shape} {...props} />
}
