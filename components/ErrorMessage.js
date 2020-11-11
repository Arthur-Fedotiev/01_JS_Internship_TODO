export default class ErrorMessage {
  constructor(container) {
    this.container = container;
  }
  render(err) {
    this.container.innerHTML = err["newTaskName"]
      ? `<div class="alert alert-warning" role="alert">${err["newTaskName"]}</div>`
      : "";
  }
}
