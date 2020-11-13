import ErrorMessage from "./ErrorMessage.js";
import formatDate from "../src/utils/dateFormatter.js";

export default class ModalForm {
  constructor(container) {
    this.container = container;
  }

  inputToHTML(task, dateValue, identifier) {
    return `<input ${
      task.id && `value=${dateValue}`
    } type="date" id=${identifier} name=${identifier} required/>`;
  }

  render(task = {}, err, showModal) {
    const [created, expired] = task.id
      ? formatDate([task.creationDate, task.expirationDate])
      : "";

    const isError = !!err["newTaskModal"];

    this.container.innerHTML = `<div class="modal-content">
          <form name="modalForm">
            <label for="newTaskModal">Task</label><br />
            <input type="text" 
            id="newTaskModal"
            name="newTaskModal"
            ${task.id && `value="${task.content}"`}
            class="${isError ? "alert alert-warning" : ""}"  
            placeholder="Add a new task"/><br /><br />

            ${isError ? ErrorMessage.render(err["newTaskModal"]) : ""}
            
            <label for="creationDateModal">Creation date of the task</label><br />
            ${this.inputToHTML(task, created, "creationDateModal")}<br /><br />
             
            <label for="expirationDateModal">Expiration date of the task</label><br>
            ${this.inputToHTML(
              task,
              expired,
              "expirationDateModal"
            )}<br /><br /> 
             
            <button type="submit" id="submitModalBtn" class="btn btn-primary mb-2">Save</button>
            <button type="button" id="hideModalBtn" class="btn btn-primary mb-2">Cancel</button>
          </form>
        </div>`;
    this.container.style.display = showModal ? "block" : "none";
  }
}
