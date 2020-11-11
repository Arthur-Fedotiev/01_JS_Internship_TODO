import CONSTANTS from "../constants.js";

export const newTask = (value) => ({
  type: CONSTANTS.ADD_NEW_TASK,
  payload: value,
});

export const handleError = (value) => ({
  type: CONSTANTS.HANDLE_ERROR,
  payload: value,
});

export const handleModal = (value) => ({
  type: CONSTANTS.SHOW_MODAL,
  payload: value,
});

export const handleCheck = (id) => ({
  type: CONSTANTS.CHANGE_COMPLETED,
  payload: id,
});

export const handleDelete = (id) => ({
  type: CONSTANTS.DELETE_TASK,
  payload: id,
});

export const handleEdit = (id) => ({
  type: CONSTANTS.EDIT_TASK,
  payload: id,
});

export const handleFilter = (filter) => ({
  type: CONSTANTS.FILTER_TASKS,
  payload: filter,
});

export const handleSorting = (criteria) => ({
  type: CONSTANTS.SORT_TASKS,
  payload: criteria,
});
