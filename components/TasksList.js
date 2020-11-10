export default class TasksList {
  constructor(container) {
    this.container = container;
  }

  render(tasks) {
    this.container.innerHTML = `<div class="form-check">${tasks
      .map(
        (t) => `<div class="row">
          <div class="col-3">
          <input class="form-check-input my-3" type="checkbox" name="task" id=${
            t.id
          } ${t.completed ? "checked" : ""} ">
          
        <label class="form-check-label my-2 ${
          t.completed && "text-muted"
        }" for=${t.id}> ${
          t.completed ? `<del>${t.content}</del>` : t.content
        }</label>
          <i class="fas fa-pencil-alt" title="Edit" data-role="editTask" id=${
            t.id
          }></i><br>
          </div>
          <div class="col-2">
          <input type="button" id=${
            t.id
          } name="deleteBtn" value="-"} class="btn btn-secondary"></input>
          </div>
          </div>`
      )
      .join("")}</div>`;
  }
}
