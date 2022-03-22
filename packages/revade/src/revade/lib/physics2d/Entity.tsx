import { IEntity } from "miniplex"
import p2 from "p2-es"
import { Object3D, Vector3 } from "three"

export type CollisionCallback = (other: Entity) => void

export type Entity = {
  physics2d: {
    body: p2.Body
    transform: Object3D
    interpolate: boolean
    onCollisionEnter?: CollisionCallback
    onCollisionExit?: CollisionCallback
    onCollisionStay?: CollisionCallback
  }
  userData?: any
} & IEntity
