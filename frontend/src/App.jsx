import { useTodos } from './useTodos';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export function App() {
  const { todos, loading, error, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📝 My Todo List</h1>
      <TodoForm onAddTodo={addTodo} loading={loading} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={removeTodo}
        loading={loading}
        error={error}
      />
    </div>
  );
}
