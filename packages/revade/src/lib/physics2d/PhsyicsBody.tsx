import T, { ReactorComponentProps } from "@hmans/trinity"
import p2 from "p2-es"
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from "react"
import mergeRefs from "react-merge-refs"
import { Euler, Group, Quaternion, Vector3 } from "three"
import { BodyContext } from "./BodyContext"
import { usePhysicsWorld } from "./PhysicsWorld"

const tmpVec3 = new Vector3()
const tmpQuat = new Quaternion()
const tmpEuler = new Euler()

export const PhysicsBody = forwardRef<
  Group,
  ReactorComponentProps<typeof Group> & {
    interpolate?: boolean
    mass?: number
    linearDamping?: number
    angularDamping?: number
    angularVelocity?: number
    fixedRotation?: boolean
    userData?: any
  }
>(
  (
    {
      children,
      mass = 1,
      interpolate = false,
      linearDamping = 0,
      angularDamping = 0,
      fixedRotation = false,
      angularVelocity = 0,
      userData,
      ...props
    },
    ref
  ) => {
    const { world, ecs, bodies } = usePhysicsWorld()
    const group = useRef<Group>(null!)

    const [body] = useState<p2.Body>(
      () =>
        new p2.Body({
          mass,
          angularDamping,
          angularVelocity,
          damping: linearDamping,
          fixedRotation
        })
    )

    const [entity] = useState(() =>
      ecs.world.createEntity({
        body,
        options: { interpolate },
        userData
      })
    )

    /* Create and destroy an ECS entity for this physics object */
    useLayoutEffect(() => {
      world.addBody(body)
      ecs.world.addComponent(entity, "transform", group.current)

      /* Map body to entity */
      bodies.set(body, entity)

      /* Get initial position */
      group.current.getWorldPosition(tmpVec3)
      body.position = [tmpVec3.x, tmpVec3.y]

      /* Get initial rotation */
      group.current.getWorldQuaternion(tmpQuat)
      tmpEuler.setFromQuaternion(tmpQuat)
      body.angle = tmpEuler.z

      return () => {
        ecs.world.destroyEntity(entity)
        world.removeBody(body)
        bodies.delete(body)
      }
    }, [body])

    return (
      <T.Group ref={mergeRefs([group, ref])} {...props}>
        <BodyContext.Provider value={body}>{children}</BodyContext.Provider>
      </T.Group>
    )
  }
)
