import CONSTANTS from "./constants.js";
import { dateCreator } from "./tasks.js";
import getId from "./utils/getId.js";

//----------HELPERS
const createTask = (state, { payload }) => {
  return [
    ...state.tasks,
    {
      id: getId(),
      content: payload.content ? payload.content : payload,
      completed: false,
      creationDate: payload.creationDate
        ? dateCreator(payload.creationDate).created
        : dateCreator().created,
      expirationDate: dateCreator().expired,
    },
  ];
};

const editTask = (state, { payload }) => {
  return state.tasks.map((task) =>
    task.id === state.taskToEdit.id ? { ...task, ...payload } : task
  );
};

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.ADD_NEW_TASK:
      const isTasktoEdit = !!state.taskToEdit.id;

      return {
        ...state,
        tasks: isTasktoEdit
          ? editTask(state, action)
          : createTask(state, action),
      };
    case CONSTANTS.HANDLE_ERROR:
      return {
        ...state,
        err: payload,
      };
    case CONSTANTS.SHOW_MODAL:
      return {
        ...state,
        showModal: payload,
      };
    case CONSTANTS.CHANGE_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case CONSTANTS.DELETE_TASK:
      return {
        ...state,
        tasks: payload
          ? state.tasks.filter((task) => task.id !== payload)
          : state.tasks.filter((task) => !task.completed),
      };
    case CONSTANTS.EDIT_TASK:
      if (payload) {
        const index = state.tasks.findIndex((task) => task.id == payload);
        const taskToEdit = state.tasks[index];

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
    case CONSTANTS.FILTER_TASKS:
      return { ...state, showTasks: payload };

    case CONSTANTS.SORT_TASKS:
      return { ...state, sortBy: payload };
    default:
      return state;
  }
};
