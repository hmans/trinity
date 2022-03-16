import { ForwardRefExoticComponent, PropsWithoutRef, ReactElement, RefAttributes } from "react"

export interface Constructor<Instance = any> {
  new (...args: any[]): Instance
}

export type StringIndexable = {
  [key: string]: any
}

export type Factory<Instance = any> = () => Instance

export type ReactorComponentProps<Instance> = MainProps<Instance> & AttachProp & ChildrenProp

type MainProps<T> = Partial<Omit<T, HiddenProps>>

type HiddenProps = "children" | "attach"

type ChildrenProp = { children?: ReactElement | ReactElement[] }

type AttachProp = {
  /** Attach the object to the parent property specified here. */
  attach?: string
}

export type ReactorComponent<Instance> = ForwardRefExoticComponent<
  PropsWithoutRef<ReactorComponentProps<Instance>> & RefAttributes<Instance>
>
