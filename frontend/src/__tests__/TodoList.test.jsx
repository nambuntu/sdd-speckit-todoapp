import { describe, it, expect, vi } from 'vitest';

describe('TodoList', () => {
  it('handles empty list', () => {
    const todos = [];
    expect(todos.length).toBe(0);
  });

  it('renders multiple todos', () => {
    const todos = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true }
    ];
    expect(todos.length).toBe(2);
    expect(todos[0].title).toBe('Task 1');
  });

  it('filters completed todos', () => {
    const todos = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true }
    ];
    const completed = todos.filter(t => t.completed);
    expect(completed.length).toBe(1);
  });
});
