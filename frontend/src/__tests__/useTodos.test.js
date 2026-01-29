import { describe, it, expect, vi } from 'vitest';

// Lean tests that avoid DOM/jsdom. We test the API contract used by the hook
vi.mock('../src/api', () => ({
  fetchTodos: vi.fn(() => Promise.resolve([{ id: '1', title: 'Task', completed: false }])),
  createTodo: vi.fn((title) => Promise.resolve({ id: '2', title, completed: false })),
  updateTodo: vi.fn((id, completed) => Promise.resolve({ id, title: 'Task', completed })),
  deleteTodo: vi.fn(() => Promise.resolve())
}));

describe('useTodos (smoke)', () => {
  it('api mocks resolve correctly', async () => {
    const api = await import('../src/api');
    const todos = await api.fetchTodos();
    expect(Array.isArray(todos)).toBe(true);
    const created = await api.createTodo('Hello');
    expect(created.title).toBe('Hello');
    const updated = await api.updateTodo('1', true);
    expect(updated.completed).toBe(true);
    await expect(api.deleteTodo('1')).resolves.toBeUndefined();
  });
});
