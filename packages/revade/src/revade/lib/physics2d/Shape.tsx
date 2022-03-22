import p2 from "p2-es"
import { FC, useEffect, useMemo } from "react"
import { useBody } from "./BodyContext"

type ShapeProps = {
  collisionGroup?: number
  collisionMask?: number
}

export const Shape: FC<ShapeProps & { shape: p2.Shape }> = ({
  children,
  collisionGroup,
  collisionMask,
  shape
}) => {
  const body = useBody()

  useEffect(() => {
    shape.collisionGroup = collisionGroup || 1
    shape.collisionMask = collisionMask || 1

    body.addShape(shape)
    return () => void body.removeShape(shape)
  }, [])

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
