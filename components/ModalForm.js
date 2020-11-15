import ErrorMessage from "./ErrorMessage.js";
import { dateToHTMLFormatter } from "../src/utils/dateFormatter.js";

export default class ModalForm {
  constructor(container) {
    this.container = container;
  }

  inputToHTML(task, dateValue, identifier, isDateError) {
    const dateFromStorage = localStorage.invalidTask
      ? JSON.parse(localStorage.getItem("invalidTask"))[identifier]
      : "";
    return `<input  
    ${dateFromStorage && `value=${dateFromStorage}`}
    ${task.id && `value=${dateValue}`}
    type="date" id=${identifier} name=${identifier} required
    class="${isDateError ? "alert alert-warning" : ""}"
    />`;
  }

  render(task = {}, err, showModal) {
    const created = task.id ? dateToHTMLFormatter(task.creationDate) : "";
    const expired = task.id ? dateToHTMLFormatter(task.expirationDate) : "";

    const isContentError = !!err["newTaskModal"];
    const isDateError = !!err["expirationDateModal"];

    this.container.innerHTML = `<div class="modal-content">
          <form name="modalForm">
            <label for="newTaskModal">Task</label><br />
            <input type="text" 
            id="newTaskModal"
            name="newTaskModal"
            ${
              localStorage.invalidTask &&
              `value="${
                JSON.parse(localStorage.getItem("invalidTask")).content
              }"`
            }
            ${task.id && `value="${task.content}"`}
            class="${isContentError ? "alert alert-warning" : ""}"  
            placeholder="Add a new task"/><br /><br />

            ${isContentError ? ErrorMessage.render(err["newTaskModal"]) : ""}
            
            <label for="creationDateModal">Creation date of the task</label><br />
            ${this.inputToHTML(task, created, "creationDateModal")}<br /><br />
             
            <label for="expirationDateModal">Expiration date of the task</label><br>
            ${this.inputToHTML(
              task,
              expired,
              "expirationDateModal",
              isDateError
            )}<br /><br /> 
            ${
              isDateError ? ErrorMessage.render(err["expirationDateModal"]) : ""
            }
            <button type="submit" id="submitModalBtn" class="btn btn-primary mb-2">Save</button>
            <button type="button" id="hideModalBtn" class="btn btn-primary mb-2">Cancel</button>
          </form>
        </div>`;
    this.container.style.display = showModal ? "block" : "none";
  }
}
