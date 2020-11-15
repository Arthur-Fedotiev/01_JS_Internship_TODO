import { dateSorter, stringSorter } from "../src/utils/sorter.js";
import { dateSeparator } from "../src/utils/dateFormatter.js";

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
    return `<input class="form-check-input my-3 mx-3" type="checkbox" name="task" id=${
      task.id
    } ${task.completed ? "checked" : ""} ">`;
  }

  inputBtnToHTML(task) {
    return `<input type="button" id=${task.id} name="deleteBtn" value="-"} class="btn btn-secondary"></input>`;
  }

  tasksFormToHTML(task) {
    return `<div class="col-sm-4">
      <div class="card border-light mb-3" style="max-width: 18rem;">
     
      <div class="card-header form-inline px-0">
      <div class="row container-fluid align-items-center">
      <div class="col-sm-2 px-0">
      ${this.checkBoxToHTML(task)}
      </div>
      <div class="col-sm-8 px-0">
      <h5 class="text-center mr-2"> 
      ${this.labelToHTML(task)}</h5>
      </div>
      <div class="col-sm-2 pl-0">
            ${this.inputBtnToHTML(task)}
</div>
            <i class="fas fa-pencil-alt" title="Edit" data-role="editTask" id=${
              task.id
            }></i>
      </div>

    <div class="card-body">
      <h6 class="card-title">Task created: <span class=" text-muted">${dateSeparator(
        task.creationDate
      )}</span></h5>
        <h6 class="card-title">Task will expire: <span class=" text-muted">${dateSeparator(
          task.expirationDate
        )}</span></h5>
      </div>
    </div>
    </div>
      </div>`;
  }

  tasksToHTML(tasksToShow) {
    return `<div class="row">${tasksToShow
      .map((task) => this.tasksFormToHTML(task))
      .join("")}</div>`;
  }

  textFilter(textFilter) {
    return (task) =>
      task.content.toLowerCase().includes(textFilter.toLowerCase());
  }

  dateFilter(dateFilter) {
    const isThereDateFilter = dateFilter.length !== 0;
    const formattedFilter = isThereDateFilter
      ? dateSeparator(dateFilter)
      : dateFilter;
    return function (task) {
      return task.creationDate.includes(formattedFilter);
    };
  }

  render(tasks, showTasks, sortBy, textFilter, dateFilter) {
    const filteredTasks = tasks
      .filter(this.textFilter(textFilter))
      .filter(this.dateFilter(dateFilter));

    const sortedTasks = this.sortTasks(filteredTasks, sortBy);

    this.getFilteredItems(showTasks, sortedTasks);
    this.container.innerHTML = this.tasksToHTML(this.tasksToShow);
  }
}
