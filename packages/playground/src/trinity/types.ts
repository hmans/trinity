import { ForwardRefExoticComponent, PropsWithoutRef, ReactElement, RefAttributes } from "react"

export interface Constructor<Instance = any> {
  new (...args: any[]): Instance
}

export type StringIndexable = {
  [key: string]: any
}

export type Factory<Instance = any> = () => Instance

export type ReactorComponentProps<Instance> = MainProps<Instance> &
  AttachProp &
  ChildrenProp &
  ConstructorArgsProps<Instance> &
  ObjectProp<Instance>

type MainProps<T> = Omit<
  {
    [K in keyof T]?: SetArgumentType<T, K> | SetScalarArgumentType<T, K>
  },
  HiddenProps
>

type SetArgumentType<T, K extends keyof T> = T[K] extends { set: (...args: infer V) => any }
  ? V | T[K]
  : T[K]

type SetScalarArgumentType<T, K extends keyof T> = T[K] extends {
  setScalar: (scalar: infer V) => any
}
  ? V | T[K]
  : T[K]

type HiddenProps = "children" | "attach"

type ChildrenProp = { children?: ReactElement | ReactElement[] }

type AttachProp = {
  /** Attach the object to the parent property specified here. */
  attach?: string
}

export type ReactorComponent<Instance> = ForwardRefExoticComponent<
  PropsWithoutRef<ReactorComponentProps<Instance>> & RefAttributes<Instance>
>

/**
 * Our wrapper components allow the user to pass an already instantiated object, or it will create a new
 * instance of the class it wraps around.
 */
type ObjectProp<T> = {
  /** If you already have an instance of the class you want to wrap, you can pass it here. */
  object?: T | { dispose?: () => void }
}

/** Some extra props we will be accepting on our wrapper component. */
type ConstructorArgsProps<T> = {
  /** Arguments passed to the wrapped THREE class' constructor. */
  args?: T extends new (...args: any) => any ? ConstructorParameters<T> : any
}
