// Service for interacting with DummyJSON Todos API
const API_URL = 'https://dummyjson.com/todos';

export const fetchTodos = async () => {
  const res = await fetch(`${API_URL}`);
  return res.json();
};

export const fetchTodo = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const addTodo = async (todo) => {
  const res = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const updateTodo = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
