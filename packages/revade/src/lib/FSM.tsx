export class FSM<State extends string> {
  constructor(public state: State) {}

  enter(state: State) {
    this.state = state
  }
}
