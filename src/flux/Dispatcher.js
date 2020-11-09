export class Dispatcher {
  constructor() {
    this._listeners = [];
  }
  dispatch(action) {
    this._listeners.forEach((l) => {
      return l(action);
    });
  }
  register(listener) {
    console.log("REGISTER: I am called");
    this._listeners.push(listener);
  }
}
console.log("DSdsds");
