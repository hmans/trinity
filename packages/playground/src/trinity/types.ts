export interface IConstructable<T = any> {
  new (...args: any[]): T
}

export type ReactorComponentProps = {}

export type ReactorComponent<T> = React.FC
