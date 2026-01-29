export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderBottom: '1px solid #eee',
      textDecoration: todo.completed ? 'line-through' : 'none',
      opacity: todo.completed ? 0.6 : 1
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ cursor: 'pointer', width: '18px', height: '18px' }}
      />
      <span style={{ flex: 1 }}>{todo.title}</span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{ padding: '4px 8px', cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Delete
      </button>
    </div>
  );
}
