export default class InputForm {
  constructor(container) {
    this.container = container;
  }
  render(err) {
    this.container.innerHTML = `<form class="form-inline my-3" name="newTask">
    <div class="form-group mx-0 mb-2">
    <label for="newTaskName" class="sr-only">Add new task</label>
    <input  type="text"
        class="my-0 form-control ${
          err["newTaskName"] ? "alert alert-warning" : ""
        }"
        name="newTaskName"
        placeholder="Add a new task"/>
        </div>
  <button type="button" id="createTaskBtn" class="btn btn-primary mb-2">+</button>
      </form>`;
  }
}
