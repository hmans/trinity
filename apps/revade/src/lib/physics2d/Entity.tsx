import p2 from "p2-es"
import { Object3D } from "three"

export type Entity = {
  transform?: Object3D
  body: p2.Body
  options: {
    interpolate: boolean
  }
  userData?: any
}
