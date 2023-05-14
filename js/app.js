import {
  addTodo,
  removeTodo,
  completeTodo,
  getAllTodos,
} from "../Redux/actions.js";

import {
  addTodoAction,
  removeTodoAction,
  completeTodoAction,
  getAllTodosAction,
} from "../Redux/actionCreators.js";

window.removeTodoHandler = removeTodoHandler;
window.completeTodoHandler = completeTodoHandler;

let $ = document;
const todoInput = $.querySelector(".todo-input");
const addTodoBtn = $.querySelector(".todo-button");
const todoList = $.querySelector(".todo-list");
const selectBox = $.querySelector("select");

// Create Todolist Reducer
function todolistReducer(state = [], action) {
  switch (action.type) {
    case getAllTodos: {
      return state;
    }
    case addTodo: {
      let newState = [...state];

      let newTodo = {
        id: crypto.randomUUID(),
        title: action.title,
        isComplete: false,
      };
      newState.push(newTodo);

      return newState;
    }
    case removeTodo: {
      let copyState = [...state];
      let newState = copyState.filter((todo) => todo.id !== action.id);
      return newState;
    }
    case completeTodo: {
      let newState = [...state];

      newState.some((todo) => {
        if (todo.id === action.id) {
          todo.isComplete = !todo.isComplete;
        }
      });

      return newState;
    }
    default: {
      return state;
    }
  }
}

// Create Store
const store = Redux.createStore(todolistReducer);

addTodoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let newTodoTitle = todoInput.value.trim();
  store.dispatch(addTodoAction(newTodoTitle));
  let todos = store.getState();
  showTodosInDOM(todos);

  todoInput.value = "";
});

function removeTodoHandler(todoID) {
  store.dispatch(removeTodoAction(todoID));
  let todos = store.getState();
  showTodosInDOM(todos);
}

function completeTodoHandler(todoID) {
  store.dispatch(completeTodoAction(todoID));
  let todos = store.getState();
  showTodosInDOM(todos);
}

function showTodosInDOM(todos) {
  todoList.innerHTML = [];
  for (const todo of todos) {
    todoList.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="todo ${todo.isComplete && "completed"}">
               <li class="todo-item">${todo.title}</li>
               <button class="complete-btn" onclick=completeTodoHandler("${
                 todo.id
               }")>
                <i class="fas fa-check-circle"></i>
            </button>
            <button class="trash-btn" onclick=removeTodoHandler("${todo.id}")>
              <i class="fas fa-trash"></i>
            </button>
            </div>
              `
    );
  }
}

selectBox.addEventListener("change", (e) => {
  let selectedValue = e.target.value;

  store.dispatch(getAllTodosAction());
  let todos = store.getState();
  showTodosInDOM(todos);

  if (selectedValue === "all") {
    let allTodos = store.getState();
    showTodosInDOM(allTodos);
  } else if (selectedValue === "completed") {
    let completedTodos = todos.filter((todo) => todo.isComplete);
    showTodosInDOM(completedTodos);
  } else if (selectedValue === "incomplete") {
    let inCompletedTodos = todos.filter((todo) => !todo.isComplete);
    showTodosInDOM(inCompletedTodos);
  }
});
