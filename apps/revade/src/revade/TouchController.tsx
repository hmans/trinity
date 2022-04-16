import { Control, IVector2, TouchDevice } from "@hmans/controlfreak"
import * as UI from "@hmans/ui"
import { FC, useCallback, useEffect, useState } from "react"

type Position = { x: number; y: number }

class RevadeTouchDevice extends TouchDevice {
  virtualStickVector: IVector2 = { x: 0, y: 0 }

  applyVirtualStickVector = (control: Control) => {
    if (control.controller.activeDevice === this) {
      control.value.x = this.virtualStickVector.x
      control.value.y = this.virtualStickVector.y
    }
  }
}

export const touchDevice = new RevadeTouchDevice()

export const TouchController: FC<{ radius?: number }> = ({ radius = 200 }) => {
  const [active, setActive] = useState(false)
  const [origin, setOrigin] = useState<Position>(() => ({ x: 0, y: 0 }))
  const [position, setPosition] = useState<Position>(() => ({ x: 0, y: 0 }))

  const activate = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]

    setActive(true)
    setOrigin({ x: touch.clientX, y: touch.clientY })
    setPosition({ x: 0, y: 0 })
  }, [])

  const deactivate = useCallback(() => {
    touchDevice.virtualStickVector.x = 0
    touchDevice.virtualStickVector.y = 0
    setActive(false)
  }, [])

  const move = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0]

      const vector = {
        x: touch.clientX - origin.x,
        y: touch.clientY - origin.y
      }

      const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2) / (radius - 30)

      if (magnitude > 1) {
        vector.x /= magnitude
        vector.y /= magnitude
      }

      /* TODO: Cram vector into the current touch device */
      vector.x /= radius - 30
      vector.y /= radius - 30
      touchDevice.virtualStickVector.x = vector.x
      touchDevice.virtualStickVector.y = -vector.y

      setPosition(vector)
    },
    [origin]
  )

  useEffect(() => {
    touchDevice.onTouchStart.add(activate)
    touchDevice.onTouchEnd.add(deactivate)
    touchDevice.onTouchMove.add(move)

    return () => {
      touchDevice.onTouchStart.remove(activate)
      touchDevice.onTouchEnd.remove(deactivate)
      touchDevice.onTouchMove.remove(move)
    }
  }, [activate, deactivate, move])

  return (
    <UI.Panel
      top
      left
      style={{
        width: "100vw",
        height: "100vh",
        pointerEvents: "all"
      }}
    >
      {active && (
        <Joystick
          origin={origin}
          position={position}
          radius={radius}
          stickRadius={30}
        />
      )}
    </UI.Panel>
  )
}

const Joystick: FC<{
  origin: Position
  position: Position
  radius?: number
  stickRadius?: number
}> = ({ origin, position, radius = 200, stickRadius = radius / 8 }) => (
  <UI.Panel left={origin.x - radius} top={origin.y - radius}>
    <svg width={radius * 2} height={radius * 2}>
      <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill="rgba(255, 255, 255, 0.1)"
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius / 8}
        fill="rgba(0, 0, 0, 0.1)"
      />

      {/* Actual "stick" */}
      <circle
        cx={radius + position.x * (radius - 30)}
        cy={radius + position.y * (radius - 30)}
        r={stickRadius}
        fill="rgba(255, 255, 255, 0.5)"
      />
    </svg>
  </UI.Panel>
)
