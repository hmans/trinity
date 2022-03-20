import { FC, useEffect, useMemo, useState } from "react"
import { useBody } from "./BodyContext"
import p2 from "p2-es"
import { ShapeGeometry } from "three"

type FixtureProps = {}

export const Shape: FC<{ shape: p2.Shape }> = ({ children, shape }) => {
  const body = useBody()

  useEffect(() => {
    body.addShape(shape)
    return () => void body.removeShape(shape)
  }, [])

  // useEffect(() => fixture.setDensity(density), [fixture, density])
  // useEffect(() => fixture.setFriction(friction), [fixture, friction])

  return <>{children}</>
}

export const CircleShape: FC<FixtureProps & { radius?: number }> = ({
  radius = 1,
  ...props
}) => {
  const shape = useMemo(() => new p2.Circle({ radius }), [radius])
  return <Shape shape={shape} {...props} />
}

export const BoxShape: FC<FixtureProps & { size?: [number, number] }> = ({
  size = [0.5, 0.5],
  ...props
}) => {
  const shape = useMemo(
    () => new p2.Box({ width: size[0], height: size[1] }),
    [...size]
  )
  return <Shape shape={shape} {...props} />
}
