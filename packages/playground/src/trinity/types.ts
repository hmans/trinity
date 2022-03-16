export interface Constructor<Instance = any> {
  new (...args: any[]): Instance
}

export type StringIndexable = {
  [key: string]: any
}

export type Factory<T = any> = () => T

export type ReactorComponentProps<T> = MainProps<T> &
  AttachProp &
  ChildrenProp &
  ConstructorArgsProps<T> &
  ObjectProp<T>

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

export type ReactorComponent<Instance> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ReactorComponentProps<Instance>> & React.RefAttributes<Instance>
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
  args?: T extends new (...args: infer V) => T ? V : never
}
