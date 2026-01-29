import { useState } from 'react';

export function TodoForm({ onAddTodo, loading }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new todo..."
        disabled={loading}
        style={{ flex: 1, padding: '8px', fontSize: '16px' }}
      />
      <button type="submit" disabled={loading} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Add Todo
      </button>
    </form>
  );
}
