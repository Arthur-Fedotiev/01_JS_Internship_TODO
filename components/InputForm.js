export default class InputForm {
  constructor(container) {
    this.container = container;
  }
  render(err) {
    this.container.innerHTML = `<form class="form-inline my-3" name="newTask">
    <div class="form-group mx-0 mb-2">
    <div class="dropdown">
    <button  class="btn btn-secondary dropdown-toggle mr-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i class="fas fa-sort-alpha-down"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item">Date</a>
      <a class="dropdown-item">Text</a>
    </div>
  </div>
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
