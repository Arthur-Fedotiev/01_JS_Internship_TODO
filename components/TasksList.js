export default class TasksList {
  constructor(container) {
    this.container = container;
    this.tasksToShow = [];
  }

  getFilteredItems(filter, items) {
    this.tasksToShow =
      filter === "all"
        ? items
        : items.filter((item) => {
            return filter === "completed" ? item.completed : !item.completed;
          });
  }

  tasksToHTML(tasksToShow) {
    return `<div class="form-check">${tasksToShow
      .map(
        (task) => `<div class="row">
          <div class="col-3">
          <input class="form-check-input my-3" type="checkbox" name="task" id=${
            task.id
          } ${task.completed ? "checked" : ""} ">
          
        <label class="form-check-label my-2 ${
          task.completed && "text-muted"
        }" for=${task.id}> ${
          task.completed ? `<del>${task.content}</del>` : task.content
        }</label>
          <i class="fas fa-pencil-alt" title="Edit" data-role="editTask" id=${
            task.id
          }></i><br>
          </div>
          <div class="col-2">
          <input type="button" id=${
            task.id
          } name="deleteBtn" value="-"} class="btn btn-secondary"></input>
          </div>
          </div>`
      )
      .join("")}</div>`;
  }

  render(tasks, showTasks) {
    this.getFilteredItems(showTasks, tasks);
    this.container.innerHTML = this.tasksToHTML(this.tasksToShow);
  }
}
