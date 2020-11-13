import ErrorMessage from "./ErrorMessage.js";

export default class InputForm {
  constructor(container) {
    this.container = container;
  }

  render(err) {
    const isError = !!err["newTaskName"];

    this.container.innerHTML = `<form class="form-inline my-3" name="newTask">
    <div class="form-group mx-0 mb-2">
    <button  class="btn btn-secondary mr-2" type="button" id="sortAndFilterMenu">
     <i id="toggleSortingBlock" class="fas fa-sort-alpha-down"></i>
    </button>
        <label for="newTaskName" class="sr-only">Add new task</label>
    <input  type="text"
        class="my-0 form-control ${isError ? "alert alert-warning" : ""}"
        name="newTaskName"
        id="newTaskInput"
        placeholder="Add a new task"
        
        />
   </div>
  <button type="button" id="createTaskBtn" class="btn btn-primary mb-2">+</button>
 </form>
 ${isError ? ErrorMessage.render(err["newTaskName"]) : ""}
      `;
  }
}
