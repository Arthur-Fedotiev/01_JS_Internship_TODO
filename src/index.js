import tasks, { dateCreator } from "./tasks.js";
import { ReduceStore } from "./flux/ReduceStore.js";
import ModalForm from "../components/ModalForm.js";
import TasksList from "../components/TasksList.js";
import ErrorMessage from "../components/ErrorMessage.js";
import InputForm from "../components/InputForm.js";

//------------------ ACTION CONSTANTS

const ADD_NEW_TASK = "ADD_NEW_TASK";
const DELETE_TASK = "DELETE_TASK";
const EDIT_TASK = "EDIT_TASK";
const HANDLE_ERROR = "HANDLE_ERROR";
const SHOW_MODAL = "SHOW_MODAL";
const CHANGE_COMPLETED = "CHANGE_COMPLETED";
const FILTER_TASKS = "FILTER_TASKS";

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

const handleCheck = (id) => ({
  type: CHANGE_COMPLETED,
  payload: id,
});

const handleDelete = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

const handleEdit = (id) => ({
  type: EDIT_TASK,
  payload: id,
});

const handleFilter = (filter) => ({
  type: FILTER_TASKS,
  payload: filter,
});

//------------------ STORE (contains State of App)

class ToDoStore extends ReduceStore {
  setInitialState() {
    return {
      tasks,
      err: {},
      taskToEdit: {},
      showModal: false,
      showTasks: "all",
    };
  }
  reduce(state, action) {
    //console.log(action);
    const { type, payload } = action;
    switch (type) {
      case ADD_NEW_TASK:
        return {
          ...state,
          tasks: state.taskToEdit.id
            ? tasks.map((t) =>
                t.id === state.taskToEdit.id ? { ...t, ...payload } : t
              )
            : [
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
      case CHANGE_COMPLETED:
        return {
          ...state,
          tasks: state.tasks.map((t) =>
            t.id === payload ? { ...t, completed: !t.completed } : t
          ),
        };
      case DELETE_TASK:
        return {
          ...state,
          tasks: payload
            ? state.tasks.filter((t) => t.id === payload)
            : state.tasks.filter((t) => !t.completed),
        };
      case EDIT_TASK:
        if (!null) {
          const idx = state.tasks.findIndex((t) => t.id == payload);
          const taskToEdit = state.tasks[idx];
          return {
            ...state,
            taskToEdit: taskToEdit,
          };
        } else {
          return {
            ...state,
            taskToEdit: {},
          };
        }
      case FILTER_TASKS:
        return { ...state, showTasks: payload };

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
  //console.log(err);
  return err;
};

//------------ EVENT HANDLERS
const handleEvent = (e) => {
  const { target, type } = e;
  // console.log(target.dataset.role, type);
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
          toDoStore.dispatch(handleEdit(null));
        }
      }
      break;

    case "click":
      console.log(target.parentNode.id === "filters");
      if (target.id === "createTaskBtn") toDoStore.dispatch(handleModal(true));
      if (target.id === "hideModalBtn") {
        toDoStore.dispatch(handleError({}));
        toDoStore.dispatch(handleModal(false));
      }
      if (target.name === "deleteBtn") {
        toDoStore.dispatch(handleDelete(+target.id));
      }
      if (target.dataset.role === "editTask") {
        toDoStore.dispatch(handleEdit(+target.id));
        toDoStore.dispatch(handleModal(true));
      }

      if (target.parentNode.id === "filters") {
        target.dataset.filter === "clearCompleted"
          ? toDoStore.dispatch(handleDelete(null))
          : toDoStore.dispatch(handleFilter(target.dataset.filter));
      }

      break;

    case "input":
      if (target.name === "task") toDoStore.dispatch(handleCheck(+target.id));
      break;
    default:
      throw Error("No such a case");
  }
};
document.addEventListener("submit", handleEvent);
document.addEventListener("click", handleEvent);
document.addEventListener("input", handleEvent);

//----------------VIEWS
const modalForm = new ModalForm(document.getElementById("modalWindow"));
const tasksList = new TasksList(document.getElementById("tasks"));
const errorMessage = new ErrorMessage(document.getElementById("errorMessage"));
const inputForm = new InputForm(document.getElementById("inputForm"));

const filterEl = document.getElementById("filters");

const render = ({ tasks, showModal, err, taskToEdit, showTasks }) => {
  filterEl.innerHTML = `
  <button type="button" data-filter="all" class="btn btn-primary">ALL</button>
  <button type="button" data-filter="active" class="btn btn-primary">ACTIVE</button>
  <button type="button" data-filter="completed" class="btn btn-primary">COMPLETED</button>
  <button type="button" data-filter="clearCompleted" class="btn btn-primary">CLEAR COMPLETED</button>`;
  tasksList.render(tasks, showTasks);
  inputForm.render(err);
  errorMessage.render(err);
  modalForm.render(taskToEdit, err, showModal);
};

// --------------- CALLING & REGISTRING of RENDER
render(toDoStore.setInitialState());
toDoStore.register(render);

//---------------- Just handy (must be deleted later)
window.toDoStore = toDoStore;
