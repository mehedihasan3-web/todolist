const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo_form");
const todoInput = document.querySelector("#inputTodo");
const todoAddBtn = document.querySelector("#addTodoBtn");
const todoLists = document.querySelector("#lists");
const massageElement = document.querySelector("#message");

// 10th
// showMessage

const showMessage = (text, status) => {
  massageElement.textContent = text;
  massageElement.classList.add(`bg-${status}`);
  setTimeout(() => {
    massageElement.textContent = "";
    massageElement.classList.remove(`bg-${status}`);
  }, 1000);
};

// 8th
// create todo
const createTodo = (todoId, todoValue) => {
  // 9th
  //add element
  const todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("list_style");
  todoElement.innerHTML = `
  
  <span> ${todoValue} </span>
    <span> <button class="btn" id="deleteButton"><i class="fa-solid fa-trash"></i></button> </span> 
  
  
  `;
  todoLists.appendChild(todoElement);
  // 13th
  //delete todo
  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};
// 14th
// delete todo function
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);

  showMessage("Todo is delete", "danger");

  // delete form localStorage
  const todoId = selectedTodo.id;
  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("mytodos", JSON.stringify(todos));
};

// 12
//gettodosFromLocalStorage
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

// 2nd
// addTodo
const addTodo = (event) => {
  event.preventDefault();
  // 3rd
  // finding a value
  const todoValue = todoInput.value;

  // 4th
  //unique id
  const todoId = Date.now().toString();

  // 5th
  // create todo
  createTodo(todoId, todoValue);

  //show massage
  showMessage("todo is added", "success");

  // 11th
  // localStorage adding value
  const todos = getTodosFromLocalStorage();
  todos.push({ todoId, todoValue });
  localStorage.setItem("mytodos", JSON.stringify(todos));
  todoInput.value = "";
};
// 1st
// adding listener in form
todoForm.addEventListener("submit", addTodo);

// last
// loadTodo
const loadTodo = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
};
window.addEventListener("DOMContentLoaded", loadTodo);
