import C from "./constants.js";
import tasks, { dateCreator } from "./tasks.js";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.ADD_NEW_TASK:
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
    case C.HANDLE_ERROR:
      return {
        ...state,
        err: payload,
      };
    case C.SHOW_MODAL:
      return {
        ...state,
        showModal: payload,
      };
    case C.CHANGE_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case C.DELETE_TASK:
      return {
        ...state,
        tasks: payload
          ? state.tasks.filter((t) => t.id !== payload)
          : state.tasks.filter((t) => !t.completed),
      };
    case C.EDIT_TASK:
      console.log(payload);
      if (payload) {
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
    case C.FILTER_TASKS:
      return { ...state, showTasks: payload };

    default:
      return state;
  }
};
