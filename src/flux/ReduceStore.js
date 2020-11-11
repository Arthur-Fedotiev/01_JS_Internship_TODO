console.log("Reduce store is loaded");

export class ReduceStore {
  constructor() {
    this._listeners = [];
    this.state = this.setInitialState();
  }

  setInitialState() {
    throw Error("Must be overridden in subclasses");
  }

  emitChange() {
    this._listeners.map((l) => l(this.state));
  }

  register(listener) {
    this._listeners.push(listener);
  }
  getState() {
    return this.state;
  }

  reduce() {
    throw Error("Must be overridden in subclasses");
  }

  dispatch(action) {
    const newState = this.reduce(this.state, action);

    if (newState !== this.state) {
      this.state = newState;
      this.emitChange();
    }
  }
}
