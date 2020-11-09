import tasks, { dateCreator } from "./tasks.js";
import { ReduceStore } from "./flux/ReduceStore.js";

//------------------ ACTION CONSTANTS

const ADD_NEW_TASK = "ADD_NEW_TASK";
const HANDLE_ERROR = "HANDLE_ERROR";
const SHOW_MODAL = "SHOW_MODAL";

//------------------ ACTION CREATORS
const newTask = (value) => ({
  type: ADD_NEW_TASK,
  payload: value,
});

const handleError = (value) => ({
  type: HANDLE_ERROR,
  payload: value,
});

const handleModal = (value) => ({
  type: SHOW_MODAL,
  payload: value,
});

//------------------ STORE (contains State of App)

class ToDoStore extends ReduceStore {
  setInitialState() {
    return { tasks, err: {}, formInput: "", showModal: false };
  }
  reduce(state, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD_NEW_TASK:
        return {
          ...state,
          tasks: [
            ...state.tasks,
            {
              id: state.tasks.length + 1,
              content: payload.content ? payload.content : payload,
              completed: false,
              creationDate: payload.creationDate
                ? dateCreator(payload.creationDate).created
                : dateCreator().created,
              expirationDate: dateCreator().expired,
            },
          ],
        };
      case HANDLE_ERROR:
        return {
          ...state,
          err: payload,
        };
      case SHOW_MODAL:
        return {
          ...state,
          showModal: payload,
        };

      default:
        throw Error("No such a case");
    }
  }
}

const toDoStore = new ToDoStore(); // STORE for TODO CREATED

//--------- INPUT Validation
const validate = (data) => {
  const err = {};
  if (data.value.match(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi))
    err[data.name] = "Task must not include special characters!";
  if (!data.value) err[data.name] = "This field cannot be empty!";
  console.log(err);
  return err;
};

//------------ EVENT HANDLERS
const handleEvent = (e) => {
  const { target, type } = e;

  switch (type) {
    case "submit":
      e.preventDefault();
      if (target.name === "newTask") {
        let err = validate({
          name: "newTaskName",
          value: target.newTaskName.value,
        });
        toDoStore.dispatch(handleError(err));
        if (!err["newTaskName"]) {
          toDoStore.dispatch(handleError({}));
          toDoStore.dispatch(newTask(target.newTaskName.value));
          target.newTaskName.value = "";
        }
      }
      if (target.name === "modalForm") {
        let err = validate({
          name: "newTaskModal",
          value: target.newTaskModal.value,
        });
        toDoStore.dispatch(handleError(err));
        if (!err["newTaskModal"]) {
          toDoStore.dispatch(handleError({}));
          toDoStore.dispatch(
            newTask({
              content: target.newTaskModal.value,
              creationDate: target.creationDateModal.value,
              expirationDate: target.expirationDateModal.value,
            })
          );
          toDoStore.dispatch(handleModal(false));
        }
      }
      break;

    case "click":
      if (target.id === "createTaskBtn") toDoStore.dispatch(handleModal(true));
      if (target.id === "hideModalBtn") {
        toDoStore.dispatch(handleError({}));
        toDoStore.dispatch(handleModal(false));
      }
      break;
    default:
      throw Error("No such a case");
  }
};
document.addEventListener("submit", handleEvent);
document.addEventListener("click", handleEvent);

//----------------VIEWS

const tasksSection = document.getElementById("tasks");
const inputForm = document.getElementById("inputForm");
const errorMessage = document.getElementById("errorMessage");
const modalWindow = document.getElementById("modalWindow");

const render = (state) => {
  tasksSection.innerHTML = `<ul class="list-group">${state.tasks
    .map((t) => `<li class="list-group-item">${t.content}</li>`)
    .join("")}</ul>`;
  inputForm.innerHTML = `<form class="form-inline my-3" name="newTask">
  <div class="form-group mx-0 mb-2">
  <label for="newTaskName" class="sr-only">Add new task</label>
  <input  type="text"
      class="my-0 form-control ${
        state.err["newTaskName"] ? "alert alert-warning" : ""
      }"
      name="newTaskName"
      value="${state.formInput}"
      placeholder="Add a new task"/>
      </div>
<button type="button" id="createTaskBtn" class="btn btn-primary mb-2">+</button>
    </form>`;
  errorMessage.innerHTML = state.err["newTaskName"]
    ? `<div class="alert alert-warning" role="alert">${state.err["newTaskName"]}</div>`
    : "";
  modalWindow.style.display = state.showModal ? "block" : "none";
  modalWindow.innerHTML = `<div class="modal-content">
  <form name="modalForm">
    <label for="newTaskModal">New task</label><br />
    <input type="text" 
    id="newTaskModal"
    name="newTaskModal"
    class="${state.err["newTaskModal"] ? "alert alert-warning" : ""}"  
    placeholder="Add a new task"/><br />

  <blockquote role="alert" id="errorMessage">
    ${
      state.err["newTaskModal"]
        ? `<div class="alert alert-warning" role="alert">${state.err["newTaskModal"]}</div>`
        : ""
    }
    </blockquote>
    <label for="creationDateModal">Creation date of the task</label><br />
    <input type="date" id="creationDateModal" name="creationDateModal" required/><br /><br />
    <label for="expirationDateModal">Expiration date of the task</label><br>
    <input type="date" id="expirationDateModal" name="expirationDateModal" required/><br /><br />  
    <button type="submit" id="submitModalBtn" class="btn btn-primary mb-2">Save</button>
    <button type="button" id="hideModalBtn" class="btn btn-primary mb-2">Cancel</button>
  </form>
</div>`;
};

// --------------- CALLING & REGISTRING of RENDER
render(toDoStore.setInitialState());
toDoStore.register(render);

//---------------- Just handy (must be deleted later)
window.toDoStore = toDoStore;