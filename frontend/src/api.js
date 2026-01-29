const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function fetchTodos() {
  const res = await fetch(`${API_URL}/api/todos`);
  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();
  return data.data;
}

export async function createTodo(title) {
  const res = await fetch(`${API_URL}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error?.message || 'Failed to create');
  }
  const data = await res.json();
  return data.data;
}

export async function updateTodo(id, completed) {
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });
  if (!res.ok) throw new Error('Failed to update');
  const data = await res.json();
  return data.data;
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete');
}
