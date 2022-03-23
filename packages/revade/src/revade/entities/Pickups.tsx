import T, { makeInstanceComponents } from "@hmans/trinity"
import { ECS } from "../state"

const Pickup = makeInstanceComponents()

export const Pickups = () => (
  <>
    <Pickup.Root>
      <T.BoxGeometry args={[0.5, 1, 0.5]} />
      <T.MeshBasicMaterial color="#3c3" />
    </Pickup.Root>

    <ECS.Collection tag="pickup">
      {(entity) => (
        <>
          <ECS.Component name="transform">
            <Pickup.Instance position={entity.spawnAt} />
          </ECS.Component>
        </>
      )}
    </ECS.Collection>
  </>
)
