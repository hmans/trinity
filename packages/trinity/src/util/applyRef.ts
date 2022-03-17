export const applyRef = <T>(ref: React.ForwardedRef<T>, value: T) => {
  if (!ref) return

  if (ref instanceof Function) ref(value)
  else ref.current = value
}
