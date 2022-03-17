import { Constructor } from "three"

export type ReactorComponent<
  TConstructor extends Constructor<any>,
  Instance = InstanceType<TConstructor>
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ReactorComponentProps<TConstructor>> & React.RefAttributes<Instance>
>

export type ReactorComponentProps<
  TConstructor extends Constructor<any>,
  T = InstanceType<TConstructor>
> = MainProps<T> & AttachProp & ChildrenProp & ConstructorArgsProps<TConstructor> & ObjectProp<T>

type MainProps<T> = Omit<ConvenienceProps<T>, "children" | "attach" | "args">

type ConvenienceProps<T> = {
  [K in keyof T]?: SetArgumentType<T, K> | SetScalarArgumentType<T, K>
}

type SetArgumentType<T, K extends keyof T> = T[K] extends {
  set: (...args: infer Arguments) => any
}
  ? Arguments extends [any]
    ? Arguments[0] | T[K]
    : Arguments | T[K]
  : T[K]

type SetScalarArgumentType<T, K extends keyof T> = T[K] extends {
  setScalar: (scalar: infer Argument) => any
}
  ? Argument | T[K]
  : T[K]

type ChildrenProp = { children?: React.ReactNode | (() => JSX.Element) }

type AttachProp = {
  /** Attach the object to the parent property specified here. */
  attach?: string
}

/**
 * Our wrapper components allow the user to pass an already instantiated object, or it will create a new
 * instance of the class it wraps around.
 */
type ObjectProp<T> = {
  /** If you already have an instance of the class you want to wrap, you can pass it here. */
  object?: T | { dispose?: () => void }
}

/** Some extra props we will be accepting on our wrapper component. */
type ConstructorArgsProps<TConstructor> = {
  /** Arguments passed to the wrapped THREE class' constructor. */
  args?: TConstructor extends new (...args: infer V) => any ? V : never
}
