// src/utils/todoHandlers.js
// Centralized handlers for todo actions in the Trello-style Todo Board app

import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/todoService';

const STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

// Always map status from completed if missing
export const mapStatus = todo => {
  if (todo.status) return todo;
  if (todo.completed) return { ...todo, status: STATUS.COMPLETED };
  return { ...todo, status: STATUS.PENDING };
};

export async function loadTodos(setTodos) {
  const data = await fetchTodos();
  setTodos(data.todos.map(mapStatus));
}

export async function handleAddInline(todo, setTodos) {
  const status = todo.status;
  const newTodo = await addTodo({ ...todo, userId: 1, status, completed: status === STATUS.COMPLETED });
  setTodos(prev => [...prev, { ...newTodo, status }]);
}

export async function handleUpdateInline(todo, setTodos) {
  const status = todo.status;
  await updateTodo(todo.id, { ...todo, status, completed: status === STATUS.COMPLETED });
  setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, ...todo, status } : t));
}

export async function handleDelete(id, setTodos) {
  await deleteTodo(id);
  setTodos(prev => prev.filter(todo => todo.id !== id));
}

export async function handleDrop(e, status, todos, setTodos) {
  const todoId = e.dataTransfer.getData('todoId');
  const todo = todos.find(t => t.id === Number(todoId));
  if (!todo) return;
  let updated = { ...todo, status, completed: status === STATUS.COMPLETED };
  await updateTodo(todo.id, updated);
  setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, ...updated } : t));
}

export function handleDragStart(e, todo) {
  e.dataTransfer.setData('todoId', todo.id);
}
