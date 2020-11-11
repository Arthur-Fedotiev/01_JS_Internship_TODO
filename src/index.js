import tasks, { filters, dataFilters } from "./tasks.js";
import { ReduceStore } from "./flux/ReduceStore.js";
import ModalForm from "../components/ModalForm.js";
import TasksList from "../components/TasksList.js";
import ErrorMessage from "../components/ErrorMessage.js";
import InputForm from "../components/InputForm.js";
import FilterButtonsList from "../components/FilterButtonsList.js";
import taskReducer from "./taskReducer.js";
import CONSTANTS from "./constants.js";
import {
  newTask,
  handleError,
  handleModal,
  handleCheck,
  handleDelete,
  handleEdit,
  handleFilter,
} from "./AC/index.js";
import validate from "./utils/validate.js";

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
  reduce = (state, action) => taskReducer(state, action);
}

const toDoStore = new ToDoStore(); // STORE for TODO CREATED

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
          toDoStore.dispatch(handleEdit(null));
        }
      }
      break;

    case "click":
      if (target.id === CONSTANTS.CREATE_TASK_BTN)
        toDoStore.dispatch(handleModal(true));
      if (target.id === CONSTANTS.HIDE_MODAL_BTN) {
        toDoStore.dispatch(handleError({}));
        toDoStore.dispatch(handleModal(false));
        toDoStore.dispatch(handleEdit(null));
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
const filterButtonsList = new FilterButtonsList(
  document.getElementById("filters"),
  filters,
  dataFilters
);

const render = ({ tasks, showModal, err, taskToEdit, showTasks }) => {
  filterButtonsList.render();
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
