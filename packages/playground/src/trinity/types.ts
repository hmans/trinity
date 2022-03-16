import { ForwardRefExoticComponent, ForwardRefRenderFunction } from "react"

export interface Constructor<Instance = any> {
  new (...args: any[]): Instance
}

export type Factory<Instance = any> = () => Instance

export type ReactorComponentProps = {}

export type ReactorComponent<T> = ForwardRefExoticComponent<any>
