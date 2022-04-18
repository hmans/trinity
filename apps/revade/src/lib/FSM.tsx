import { ReactNode, useEffect } from "react"
import { useRerender } from "@hmans/react-toolbox"
import { Signal } from "@hmans/signal"

export function makeFSM<
  AvailableStates extends string,
  State extends AvailableStates,
  Transition extends string
>(fsm: {
  readonly states: AvailableStates[]
  state: State
  transitions?: Record<Transition, { from: State | State[]; to: State }>
}) {
  const onStateChange = new Signal<State>()

  /* <Match> */
  function Match({
    state,
    children
  }: {
    state: string | string[]
    children?: ReactNode
  }) {
    const rerender = useRerender()

    useEffect(() => {
      onStateChange.add(rerender)
      return () => void onStateChange.remove(rerender)
    }, [state])

    const isActive =
      typeof state === "string"
        ? state === fsm.state
        : state.includes(fsm.state)

    return <>{isActive && children}</>
  }

  function enterState(state: State) {
    console.log("Entering state", state)
    fsm.state = state
    onStateChange.emit(state)
  }

  function transition(name: Transition) {
    if (!fsm.transitions) throw new Error("No transitions defined.")
    if (!(name in fsm.transitions))
      throw new Error(`No transition called ${name} available.`)

    const transition = fsm.transitions[name]
    const { to } = transition
    const from = Array.isArray(transition.from)
      ? transition.from
      : [transition.from]

    for (const s of from)
      if (!fsm.states.includes(s)) throw new Error(`Unknown state ${s}.`)
    if (!fsm.states.includes(to)) throw new Error(`Unknown state ${to}.`)

    if (!from.includes(fsm.state)) {
      console.error(
        `Transition "${name}" requested to transition from state "${from}", but current state is "${fsm.state}".`
      )
      return
    }

    /* We're good. Lets' go! */
    enterState(to)
  }

  return { Match, transition }
}
