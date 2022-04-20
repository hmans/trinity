import { forwardRef } from "react"
import T from "react-trinity"
import { PerspectiveCamera } from "three"
import { ECS } from "../state"

type CameraProps = { offset?: [number, number, number] }

export const Camera = forwardRef<PerspectiveCamera, CameraProps>(
  ({ offset = [0, 0, 75] }, ref) => {
    return (
      <ECS.Entity>
        <ECS.Component name="camera" data={{ offset }} />

        <ECS.Component name="transform">
          <T.Group position={offset}>
            <T.PerspectiveCamera ref={ref} />
          </T.Group>
        </ECS.Component>
      </ECS.Entity>
    )
  }
)
