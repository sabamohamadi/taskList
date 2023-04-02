// variable
const form = document.querySelector(".task-form");
const inputTask = document.getElementById("task");
const collection = document.querySelector(".collection");
const clearbtn = document.querySelector(".clear-tasks");
const filterInput = document.getElementById("filter");

// call load event listener
loadEventListener();

// declear load event listner
function loadEventListener() {
  // document load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task
  form.addEventListener("submit", addTask);
  // delete task
  collection.addEventListener("click", removeTaks);
  // clear all the task
  clearbtn.addEventListener("click", clearTasks);
  // filter tasks
  filterInput.addEventListener("keyup", filterTasks);
}

// get Tasks
function getTasks(e) {
  let tasks = localStorage.getItem("tasks") ? JSON.parse(tasks) : [];

  tasks.forEach(function (task) {
    createTaskElement(task)
  });
}
// declear add task function
function addTask(e) {
  if (inputTask.value === "") {
    alert("enter a task !!");
  } else {
    createTaskElement(inputTask.value)
    // add to local storage
    storeTaskInLocalStorage(inputTask.value);
    //clear input
    inputTask.value = "";
  }
  e.preventDefault();
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "collection-item"; 
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class ="fa fa-remove"></i>';

    li.appendChild(link);
    collection.appendChild(li);
}

// store in LS
function storeTaskInLocalStorage(value) {
  let tasks = localStorage.getItem("tasks") ? JSON.parse(tasks) : [];

  tasks.push(value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// declear remove task
function removeTaks(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you shure?"))
      e.target.parentElement.parentElement.remove();
    // remove from LS
    removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}
// remove from LS
function removeFromLocalStorage(value) {
  const removeVal = value.textContent;
  let tasks = localStorage.getItem("tasks") ? JSON.parse(tasks) : [];

  tasks.forEach(function (task, index) {
    if (task === removeVal) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// declear clear all tasks
function clearTasks(e) {
  collection.innerHTML = "";
  // faster is while
  /*while(collection.firstChild){
  collection.removeChild(collection.firstChild);
 }*/
  clearTasksFromLocalStorage();
}
// clear tasks function
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
// declear filtertasks
function filterTasks(e) {
  const input = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(input) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
