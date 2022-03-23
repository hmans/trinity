import p2 from "p2-es"
import { FC, useEffect, useMemo } from "react"
import { useBody } from "./BodyContext"

type ShapeProps = {
  sensor?: boolean
  collisionGroup?: number
  collisionMask?: number
  onBeginContact?: (otherShape: p2.Shape) => void
  onEndContact?: (otherShape: p2.Shape) => void
}

export const Shape: FC<ShapeProps & { shape: p2.Shape }> = ({
  children,
  collisionGroup,
  collisionMask,
  onBeginContact,
  onEndContact,
  sensor,
  shape
}) => {
  const body = useBody()

  useEffect(() => {
    shape.collisionGroup = collisionGroup || 1
    shape.collisionMask = collisionMask || 1
    shape.sensor = !!sensor

    body.addShape(shape)
    return () => void body.removeShape(shape)
  }, [])

  /* Register contact callbacks */
  useEffect(() => {
    if (!onBeginContact) return

    body.world.on("beginContact", (e: p2.BeginContactEvent) => {
      if (e.shapeA === shape) onBeginContact(e.shapeB)
      else if (e.shapeB === shape) onBeginContact(e.shapeA)
    })
  })

  useEffect(() => {
    if (!onEndContact) return

    body.world.on("endContact", (e: p2.EndContactEvent) => {
      if (e.shapeA === shape) onEndContact(e.shapeB)
      else if (e.shapeB === shape) onEndContact(e.shapeA)
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
