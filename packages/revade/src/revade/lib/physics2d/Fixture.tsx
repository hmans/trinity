import { FC, useEffect, useMemo, useState } from "react"
import { useBody } from "./BodyContext"
import * as pl from "planck"

type FixtureProps = {
  density?: number
  friction?: number
}

export const Fixture: FC<FixtureProps & { shape: pl.Shape }> = ({
  children,
  shape,
  density = 1,
  friction = 0
}) => {
  const body = useBody()
  const [fixture] = useState(() => body.createFixture({ shape }))

  useEffect(() => () => body.destroyFixture(fixture), [body, fixture])

  useEffect(() => fixture.setDensity(density), [fixture, density])
  useEffect(() => fixture.setFriction(friction), [fixture, friction])

  return <>{children}</>
}

export const CircleFixture: FC<FixtureProps & { radius?: number }> = ({
  radius = 1,
  ...props
}) => {
  const shape = useMemo(() => pl.Circle(radius), [radius])
  return <Fixture shape={shape} {...props} />
}

export const BoxFixture: FC<FixtureProps & { size?: [number, number] }> = ({
  size = [0.5, 0.5],
  ...props
}) => {
  const shape = useMemo(() => pl.Box(size[0], size[1]), [...size])
  return <Fixture shape={shape} {...props} />
}
