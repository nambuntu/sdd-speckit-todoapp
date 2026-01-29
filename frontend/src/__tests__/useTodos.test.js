import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../src/useTodos';

vi.mock('../src/api', () => ({
  fetchTodos: vi.fn(() => Promise.resolve([{ id: '1', title: 'Task', completed: false }])),
  createTodo: vi.fn((title) => Promise.resolve({ id: '2', title, completed: false })),
  updateTodo: vi.fn((id, completed) => Promise.resolve({ id, title: 'Task', completed })),
  deleteTodo: vi.fn(() => Promise.resolve())
}));

describe('useTodos', () => {
  it('initializes with empty todos and loading', () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.loading).toBe(true);
  });

  it('fetches todos on mount', async () => {
    const { result } = renderHook(() => useTodos());
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(result.current.todos).toHaveLength(1);
  });

  it('addTodo adds new todo', async () => {
    const { result } = renderHook(() => useTodos());
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await act(async () => {
      await result.current.addTodo('New task');
    });
    
    expect(result.current.todos.some(t => t.title === 'New task')).toBe(true);
  });
});
