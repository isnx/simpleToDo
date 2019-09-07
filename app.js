const inputTask = document.querySelector("#add-task");
const btn = document.querySelector(".add-btn");
const list = document.querySelector(".my-list");
const delBtn = document.querySelector("button");
const filter = document.querySelector("#filter");

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(task => {
    const li = document.createElement("li");
    const spanLi = document.createElement("span");
    spanLi.style.width = "95%";
    const deleteLi = document.createElement("a");
    deleteLi.style.width = "5%";
    deleteLi.style.textAlign = "center";
    spanLi.textContent = task;
    deleteLi.textContent = "x";
    deleteLi.classList.add("delete");
    li.appendChild(spanLi);
    li.appendChild(deleteLi);
    list.appendChild(li);
  });
}

const addTask = e => {
  if (inputTask.value === "") {
    alert("Add task");
  } else {
    const li = document.createElement("li");
    const spanLi = document.createElement("span");
    spanLi.style.width = "95%";
    const deleteLi = document.createElement("a");
    deleteLi.style.width = "5%";
    deleteLi.style.textAlign = "center";
    spanLi.textContent = inputTask.value;
    deleteLi.textContent = "x";
    deleteLi.classList.add("delete");
    li.appendChild(spanLi);
    li.appendChild(deleteLi);
    list.appendChild(li);

    storeTaskInLocalStorage(inputTask.value);
    inputTask.value = "";
    e.preventDefault();
  }
};

const storeTaskInLocalStorage = task => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeTask = e => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement.firstChild);
  }
};

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const deleteAll = () => {
  list.innerHTML = "";
  localStorage.clear();
};

const filterTasks = e => {
  const text = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll("li>span");
  const array = [];
  tasksArr = Array.from(tasks);

  tasksArr.forEach(task => {
    array.push(task);
  });

  array.forEach(task => {
    if (task.innerHTML.toLowerCase().indexOf(text) != -1) {
      task.parentElement.style.display = "flex";
    } else {
      task.parentElement.style.display = "none";
    }
  });
};

const allEventListeners = () => {
  btn.addEventListener("click", addTask);
  delBtn.addEventListener("click", deleteAll);
  list.addEventListener("click", removeTask);
  filter.addEventListener("keyup", filterTasks);
  document.addEventListener("DOMContentLoaded", getTasks);
};

allEventListeners();
