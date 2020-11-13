import getId from "./utils/getId.js";

export const dateCreator = (...args) => {
  const [creationDate, expirationDate] = args;

  let created = creationDate ? new Date(creationDate) : new Date();
  let expired = expirationDate
    ? new Date(expirationDate).toLocaleString()
    : new Date(created);
  console.log("create \n", created, "\n expired \n", expired);
  if (!expirationDate) {
    console.log("line14");
    console.log(created, expired);
    expired.setDate(expired.getDate() + 1);
    expired = expired.toLocaleString();
  }
  created = created.toLocaleString();
  console.log(created, expired);
  return { created, expired };
};

export const filters = ["ALL", "ACTIVE", "COMPLETED", "CLEAR COMPLETED"];
export const dataFilters = ["all", "active", "completed", "clearCompleted"];

const tasks = [
  {
    id: getId(),
    content: "Go to movies",
    completed: false,
    creationDate: dateCreator().created,
    expirationDate: dateCreator().expired,
  },
  {
    id: getId(),
    content: "Go to the theter",
    completed: false,
    creationDate: dateCreator().created,
    expirationDate: dateCreator().expired,
  },
  {
    id: getId(),
    content: "Learn javaScript",
    completed: true,
    creationDate: dateCreator().created,
    expirationDate: dateCreator().expired,
  },
];

export default tasks;
