import tasks from "./tasks.js";

const tasksSection = document.getElementById("tasks");
tasksSection.innerHTML = `<ul class="list-group">${tasks
  .map((t) => `<li class="list-group-item">${t.content}</li>`)
  .join("")}</ul>`;
