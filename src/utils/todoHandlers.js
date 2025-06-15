// src/utils/todoHandlers.js
// Centralized handlers for todo actions in the Trello-style Todo Board app

import { fetchTodos, fetchAllTodos, addTodo, updateTodo, deleteTodo } from '../services/todoService';

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

// Infinite scroll support: fetchTodos with limit/skip, append or set
export async function loadTodosPaginated({ setTodos, limit, skip, append = false }) {
  const data = await fetchTodos(limit, skip);
  if (append) {
    setTodos(prev => [...prev, ...data.todos.map(mapStatus)]);
  } else {
    setTodos(data.todos.map(mapStatus));
  }
  return data.todos.length;
}

export async function handleAddInline(todo, setTodos) {
  // Only send userId and completed to addTodo; status is not needed for API
  const completed = todo.status === STATUS.COMPLETED;
  const { status, ...todoPayload } = todo; // Remove status from payload
  const newTodo = await addTodo({ ...todoPayload, userId: 1, completed });
  setTodos(prev => [...prev, { ...newTodo, status: todo.status }]);
}

export async function handleUpdateInline(todo, setTodos) {
  // Only send the updated title (edit value) and id
  await updateTodo(todo.id, { todo: todo.todo });
  setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, todo: todo.todo } : t));
}

export async function handleDelete(id, setTodos) {
  await deleteTodo(id);
  setTodos(prev => prev.filter(todo => todo.id !== id));
}

export async function handleDrop(e, status, todos, setTodos) {
  const todoId = e.dataTransfer.getData('todoId');
  const todo = todos.find(t => t.id === Number(todoId));
  if (!todo) return;
  // Only send id and completed status to updateTodo
  const completed = status === STATUS.COMPLETED;
  await updateTodo(todo.id, { completed });
  setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, status, completed } : t));
}

export function handleDragStart(e, todo) {
  e.dataTransfer.setData('todoId', todo.id);
}

// Global search for todos across all data (not just loaded)
export async function searchTodosAcrossAll(query, status) {
  const data = await fetchAllTodos();
  return data.todos
    .map(mapStatus)
    .filter(todo =>
      todo.status === status &&
      todo.todo.toLowerCase().includes(query.toLowerCase())
    );
}
