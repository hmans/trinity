import { IEntity } from "miniplex"
import p2 from "p2-es"
import { Object3D } from "three"

export type Entity = {
  physics2d: {
    body: p2.Body
    transform: Object3D
    onCollisionEnter?: Function
    onCollisionExit?: Function
    onCollisionStay?: Function
  }
} & IEntity
