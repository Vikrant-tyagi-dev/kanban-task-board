// Service for interacting with DummyJSON Todos API
const API_URL = 'https://dummyjson.com/todos';

export const fetchTodos = async (limit = 10, skip = 0) => {
  // Fetch todos with pagination support (limit & skip)
  const res = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
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

export const fetchAllTodos = async () => {
  // Fetch all todos from the API (up to 150, the DummyJSON max)
  const res = await fetch(`${API_URL}?limit=150&skip=0`);
  return res.json();
};
