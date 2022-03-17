export interface Constructor<Instance = any> {
  new (...args: any[]): Instance
}

export type StringIndexable = {
  [key: string]: any
}

export type Factory<T = any> = () => T
