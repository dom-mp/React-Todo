import axios from 'axios'
import { TodoItem } from '../types/types.ts'

function getTodos() {
  let request = axios.get('http://localhost:3000/api/todos');
  return request.then(response => response.data);
}

function postTodo( todoItem: TodoItem ) {
  let request = axios.post('http://localhost:3000/api/todos', todoItem)
  return request;
}

function updateTodo( todoItem: TodoItem ) {
  let request = axios.put(`http://localhost:3000/api/todos/${todoItem.id}`, todoItem);
  return request;
}

function deleteTodo(todoItem: TodoItem) {
  let request = axios.delete(`http://localhost:3000/api/todos/${todoItem.id}`);
  return request;
}

export default {
  getTodos,
  postTodo,
  updateTodo,
  deleteTodo,
}