import { IEntity } from "miniplex"
import p2 from "p2-es"
import { Object3D, Vector3 } from "three"

export type Entity = {
  physics2d: {
    body: p2.Body
    transform: Object3D
    interpolate: boolean
    onCollisionEnter?: Function
    onCollisionExit?: Function
    onCollisionStay?: Function
  }
} & IEntity
