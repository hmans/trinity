import T, { makeInstanceComponents } from "@hmans/trinity"
import { BodyThiefHack } from "../BodyThiefHack"
import { DynamicBody } from "../lib/physics2d/DynamicBody"
import { CircleFixture } from "../lib/physics2d/Fixture"
import { ECS } from "../state"

const Sploder = makeInstanceComponents()

export const Sploders = () => (
  <>
    <Sploder.Root>
      <T.SphereGeometry />
      <T.MeshStandardMaterial color="red" wireframe />
    </Sploder.Root>

    <ECS.Collection tag="sploder" initial={1} memoize>
      {() => (
        <>
          <ECS.Component name="transform">
            <DynamicBody linearDamping={1} angularDamping={1}>
              <BodyThiefHack />
              <CircleFixture radius={3} density={0.1}>
                <Sploder.Instance scale={3} />
              </CircleFixture>
            </DynamicBody>
          </ECS.Component>
        </>
      )}
    </ECS.Collection>
  </>
)
