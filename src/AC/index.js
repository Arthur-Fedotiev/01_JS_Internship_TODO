import C from "../constants.js";

export const newTask = (value) => ({
  type: C.ADD_NEW_TASK,
  payload: value,
});

export const handleError = (value) => ({
  type: C.HANDLE_ERROR,
  payload: value,
});

export const handleModal = (value) => ({
  type: C.SHOW_MODAL,
  payload: value,
});

export const handleCheck = (id) => ({
  type: C.CHANGE_COMPLETED,
  payload: id,
});

export const handleDelete = (id) => ({
  type: C.DELETE_TASK,
  payload: id,
});

export const handleEdit = (id) => ({
  type: C.EDIT_TASK,
  payload: id,
});

export const handleFilter = (filter) => ({
  type: C.FILTER_TASKS,
  payload: filter,
});
