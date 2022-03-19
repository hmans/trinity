import { IEntity } from "miniplex"
import * as pl from "planck"
import { Object3D } from "three"

export type Entity = {
  physics2d: {
    body: pl.Body
    transform: Object3D
    onCollisionEnter?: Function
    onCollisionExit?: Function
    onCollisionStay?: Function
  }
} & IEntity
