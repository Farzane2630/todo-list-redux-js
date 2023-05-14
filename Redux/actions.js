export const addTodoActionType = ()=> {type: 'ADD_TODO'}
export const removeTodoActionType = ()=> {type: 'REMOVE_TODO'}
export const completeTodoActionType = ()=> {type: 'COMPLETE_TODO'}
export const getAllTodosActionType = ()=> {type: 'GET_ALL_TODOS'}


export const addTodo = ()=> addTodoActionType() 
export const removeTodo = ()=> removeTodoActionType() 
export const completeTodo = ()=> completeTodoActionType() 
export const getAllTodos = ()=> getAllTodosActionType() 
