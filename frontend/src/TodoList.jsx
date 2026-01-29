import { TodoItem } from './TodoItem';

export function TodoList({ todos, onToggle, onDelete, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  
  return (
    <div>
      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
          No todos yet. Add one to get started!
        </p>
      ) : (
        <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
