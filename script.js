//const { Children } = require("react");

const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;
// Function to add to do
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in you to do");
    return false;
  }

  if (addBtn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(inputText);
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    // Creating P tag

    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Creating edit btn

    const editBtn = document.createElement("Button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    // Creating Delete btn

    const deleteBtn = document.createElement("Button");
    deleteBtn.innerHTML = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

// Function to update : (Edit/Delete) to do
const updateTodo = (e) => {
  //  console.log(e.target.innerHTML);
  if (e.target.innerHTML === "Remove") {
    // console.log(e.target.parentElement);
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
};
// Function to save local todo
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  //  console.log(todos);
};

// Function to get local todos
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // Creating edit btn

      const editBtn = document.createElement("Button");
      editBtn.innerHTML = "Edit";
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);

      // Creating Delete btn

      const deleteBtn = document.createElement("Button");
      deleteBtn.innerHTML = "Remove";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

// Function to delete local todos
const deleteLocalTodos = (todo) =>{
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // Array functions : slice / splice
    
    
}
const editLocalTodos = (todo) => {
     let todos = JSON.parse(localStorage.getItem("todos"));
     let todoIndex = todos.indexOf(todo);
     todos[todoIndex] = inputBox.value;
     localStorage.setItem("todos", JSON.stringify(todos))
}
document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
