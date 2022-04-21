import { useEffect } from "react"

export const useEventListener = <EventName extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  event: EventName,
  fn: Parameters<typeof target.addEventListener<EventName>>[1],
  deps: any[] = []
) => {
  useEffect(() => {
    target.addEventListener(event, fn)
    return () => target.removeEventListener(event, fn)
  }, [event, target, fn, ...deps])
}
