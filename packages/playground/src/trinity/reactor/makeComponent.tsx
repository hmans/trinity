import { ReactorComponent } from "../types"

export const makeComponent = <T extends object>(
  fn: new (...args: any) => T,
  displayName: string
) => {
  /* Create a component that wraps the requested constructible instance */
  const Component: ReactorComponent<T> = ({ children }) => {
    return <>{children}</>
  }

  Component.displayName = displayName

  return Component
}
