import T, { useManagedThreeObject, useTicker } from "@hmans/trinity"
import { useCallback, useRef } from "react"
import { Group, MeshStandardMaterial } from "three"
import { PhysicsBody } from "../lib/physics2d/PhsyicsBody"
import { BoxShape } from "../lib/physics2d/Shape"
import { Layers } from "./state"

export const Level = () => {
  const material = useManagedThreeObject(
    () =>
      new MeshStandardMaterial({
        color: "hotpink",
        emissive: "hotpink",
        emissiveIntensity: 0.7
      })
  )

  const group = useRef<Group>(null!)

  // useTicker("fixed", () => {
  //   if (group.current) {
  //     group.current.rotation.z += 0.01
  //     /* TODO: make the physics engine update its bodies transforms :b */
  //   }
  // })

  return (
    <T.Group ref={group} rotation-z={0.1} name="level">
      <T.GridHelper
        rotation={[Math.PI / 2, 0, 0]}
        args={[120, 20, "#333", "#333"]}
      />
      <PhysicsBody position-x={-61} mass={0}>
        <BoxShape
          size={[2, 124]}
          collisionGroup={Layers.Default}
          collisionMask={Layers.Player | Layers.Enemies | Layers.Pickups}
        />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[2, 124, 2]} />
        </T.Mesh>
      </PhysicsBody>
      <PhysicsBody position-x={+61} mass={0}>
        <BoxShape
          size={[2, 124]}
          collisionGroup={Layers.Default}
          collisionMask={Layers.Player | Layers.Enemies | Layers.Pickups}
        />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[2, 124, 2]} />
        </T.Mesh>
      </PhysicsBody>
      <PhysicsBody position-y={-61} mass={0}>
        <BoxShape
          size={[120, 2]}
          collisionGroup={Layers.Default}
          collisionMask={Layers.Player | Layers.Enemies | Layers.Pickups}
        />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[124, 2, 2]} />
        </T.Mesh>
      </PhysicsBody>
      <PhysicsBody position-y={+61} mass={0}>
        <BoxShape
          size={[120, 2]}
          collisionGroup={Layers.Default}
          collisionMask={Layers.Player | Layers.Enemies | Layers.Pickups}
        />
        <T.Mesh material={material}>
          <T.BoxGeometry args={[124, 2, 2]} />
        </T.Mesh>
      </PhysicsBody>
    </T.Group>
  )
}
