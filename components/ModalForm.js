export default class ModalForm {
  constructor(container) {
    this.container = container;
  }
  formatDate(task) {
    let created = task.creationDate.slice(0, 10).split("/");
    created = [created.pop(), ...created].join("-");
    let expired = task.expirationDate.slice(0, 10).split("/");
    expired = [expired.pop(), ...expired].join("-");
    return { created, expired };
  }
  render(task = {}, err, showModal) {
    if (task.id) {
      var { created, expired } = this.formatDate(task);
    }
    this.container.innerHTML = `<div class="modal-content">
          <form name="modalForm">
            <label for="newTaskModal">Task</label><br />
            <input type="text" 
            id="newTaskModal"
            name="newTaskModal"
            ${task.id && `value="${task.content}"`}
            class="${err["newTaskModal"] ? "alert alert-warning" : ""}"  
            placeholder="Add a new task"/><br />
        
          <blockquote role="alert" id="errorMessage">
            ${
              err["newTaskModal"]
                ? `<div class="alert alert-warning" role="alert">${err["newTaskModal"]}</div>`
                : ""
            }
            </blockquote>
            <label for="creationDateModal">Creation date of the task</label><br />
            <input type="date" 
            ${task.id && `value=${created}`}
             id="creationDateModal" name="creationDateModal" required/><br /><br />
            <label for="expirationDateModal">Expiration date of the task</label><br>
            <input ${
              task.id && `value=${expired}`
            } type="date" id="expirationDateModal" name="expirationDateModal" required/><br /><br />  
            <button type="submit" id="submitModalBtn" class="btn btn-primary mb-2">Save</button>
            <button type="button" id="hideModalBtn" class="btn btn-primary mb-2">Cancel</button>
          </form>
        </div>`;
    this.container.style.display = showModal ? "block" : "none";
  }
}
