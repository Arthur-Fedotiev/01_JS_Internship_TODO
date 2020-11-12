import { dateSorter, stringSorter } from "../src/utils/sorter.js";

export default class TasksList {
  constructor(container) {
    this.container = container;
    this.tasksToShow = [];
  }

  sortTasks(tasks, criteria) {
    const isSortRequired = !!criteria;

    if (isSortRequired) {
      return criteria === "content"
        ? stringSorter(tasks)
        : dateSorter(tasks, "creationDate");
    } else return tasks;
  }

  getFilteredItems(filter, items) {
    this.tasksToShow =
      filter === "all"
        ? items
        : items.filter((item) => {
            return filter === "completed" ? item.completed : !item.completed;
          });
  }

  labelToHTML(task) {
    return `<label class="form-check-label my-2 ${
      task.completed && "text-muted"
    }" for=${task.id}> ${
      task.completed ? `<del>${task.content}</del>` : task.content
    }</label>`;
  }

  checkBoxToHTML(task) {
    return `<input class="form-check-input my-3" type="checkbox" name="task" id=${
      task.id
    } ${task.completed ? "checked" : ""} ">`;
  }

  inputBtnToHTML(task) {
    return `<input type="button" id=${task.id} name="deleteBtn" value="-"} class="btn btn-secondary"></input>`;
  }

  tasksFormToHTML(task) {
    return `<div class="row">
        <div class="col-3">
        ${this.checkBoxToHTML(task)}
        ${this.labelToHTML(task)}
        <i class="fas fa-pencil-alt" title="Edit" data-role="editTask" id=${
          task.id
        }></i><br>
        </div>
        <div class="col-2">
        ${this.inputBtnToHTML(task)}
        </div>
        </div>`;
  }

  tasksToHTML(tasksToShow) {
    return `<div class="form-check">${tasksToShow
      .map((task) => this.tasksFormToHTML(task))
      .join("")}</div>`;
  }

  render(tasks, showTasks, sortBy) {
    const sortedTasks = this.sortTasks(tasks, sortBy);
    this.getFilteredItems(showTasks, sortedTasks);
    this.container.innerHTML = this.tasksToHTML(this.tasksToShow);
  }
}
