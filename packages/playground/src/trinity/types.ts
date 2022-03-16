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
  EasierSetterProps<Instance> &
  ConstructorArgsProps<Instance> &
  ObjectProp<Instance>

type MainProps<T> = Partial<Omit<T, HiddenProps | keyof EasierSetterProps<T>>>

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

/* Some properties exposed by THREE objects can be written to through their .set method, so
   we're using this fact to provide some slightly more easier to use props. */
type Settable = { set: (...args: any) => any }
type SetterArguments<T extends Settable> = Parameters<T["set"]>
type FirstSetterArgument<T extends Settable> = SetterArguments<T>[0]

/** A bunch of THREE.Object3D properties that we override with a Settable type. */
export type EasierSetterProps<T> = EasierProp<T, "color", FirstSetterArgument<THREE.Color>> &
  EasierProp<T, "position", SetterArguments<THREE.Vector3>> &
  EasierProp<T, "rotation", SetterArguments<THREE.Vector3>> &
  EasierProp<T, "scale", SetterArguments<THREE.Vector3> | FirstSetterArgument<THREE.Vector3>> &
  EasierProp<T, "up", SetterArguments<THREE.Vector3>> &
  EasierProp<T, "quaternion", SetterArguments<THREE.Quaternion>> &
  EasierProp<T, "matrix", SetterArguments<THREE.Matrix4>> &
  EasierProp<T, "layers", SetterArguments<THREE.Layers>>

/**
 * Convenience type that provides an easier to set prop if it wraps around an object property that
 * can be set through a .set method.
 */
type EasierProp<T, Key, NewType = Key extends keyof T ? T[Key] : unknown> = Key extends keyof T
  ? { [key in Key]?: NewType | T[Key] }
  : {}
