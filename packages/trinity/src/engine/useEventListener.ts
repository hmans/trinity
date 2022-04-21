import { useEffect } from "react"

export function useEventListener<
  TElement extends HTMLElement | Document | Window,
  TEventName extends keyof HTMLElementEventMap,
  TEvent extends Event = HTMLElementEventMap[TEventName]
>(
  target: TElement,
  event: TEventName,
  fn: (evt: TEvent) => void,
  deps: any[] = []
) {
  useEffect(() => {
    target.addEventListener(event, fn as EventListenerOrEventListenerObject)

    return () =>
      target.removeEventListener(
        event,
        fn as EventListenerOrEventListenerObject
      )
  }, [event, target, fn, ...deps])
}
