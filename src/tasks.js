import id from "./utils/generateID.js";

export const dateCreator = (...args) => {
  const [creationDate, expirationDate] = args;

  const created = creationDate
    ? new Date(creationDate).toLocaleString()
    : new Date().toLocaleString();
  let expired = expirationDate
    ? new Date(expirationDate).toLocaleString()
    : new Date(created);

  if (!expirationDate) {
    expired.setDate(expired.getDate() + 1);
    expired = expired.toLocaleString();
  }
  return { created, expired };
};

export const filters = ["ALL", "ACTIVE", "COMPLETED", "CLEAR COMPLETED"];
export const dataFilters = ["all", "active", "completed", "clearCompleted"];

const tasks = [
  {
    id: id(),
    content: "Go to movies",
    completed: false,
    creationDate: dateCreator().created,
    expirationDate: dateCreator().expired,
  },
  {
    id: id(),
    content: "Go to the theter",
    completed: false,
    creationDate: dateCreator().created,
    expirationDate: dateCreator().expired,
  },
  {
    id: id(),
    content: "Learn javaScript",
    completed: true,
    creationDate: dateCreator().created,
    expirationDate: dateCreator().expired,
  },
];

export default tasks;
