import {
  addTodo,
  completeTodo,
  removeTodo,
  getAllTodos
} from "./actions.js";

export function getAllTodosAction() {
  return {
    type: getAllTodos
  };
}

export function addTodoAction(title) {
  return {
    type: addTodo,
    title,
  };
}

export function removeTodoAction(id) {
  return {
    type: removeTodo,
    id,
  };
}

export function completeTodoAction(id) {
  return {
    type: completeTodo,
    id,
  };
}

