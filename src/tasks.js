import getId from "./utils/getId.js";
import { dateCreator } from "./utils/dateFormatter.js";

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
