const store = require('../src/todos');

describe('TodoStore', () => {
  beforeEach(() => {
    store.todos = [];
  });

  test('getAll returns empty array', () => {
    expect(store.getAll()).toEqual([]);
  });

  test('create adds todo', () => {
    const todo = store.create('Test task');
    expect(todo.title).toBe('Test task');
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeDefined();
  });

  test('create fails without title', () => {
    expect(() => store.create('')).toThrow('Title required');
    expect(() => store.create(null)).toThrow('Title required');
  });

  test('create fails with title too long', () => {
    expect(() => store.create('x'.repeat(501))).toThrow('Title too long');
  });

  test('getById returns todo', () => {
    const created = store.create('Task');
    const found = store.getById(created.id);
    expect(found).toEqual(created);
  });

  test('updateStatus marks complete', () => {
    const todo = store.create('Task');
    const updated = store.updateStatus(todo.id, true);
    expect(updated.completed).toBe(true);
  });

  test('updateStatus fails if not found', () => {
    expect(() => store.updateStatus('invalid-id', true)).toThrow('Todo not found');
  });

  test('delete removes todo', () => {
    const todo = store.create('Task');
    store.delete(todo.id);
    expect(store.getById(todo.id)).toBeUndefined();
  });

  test('delete fails if not found', () => {
    expect(() => store.delete('invalid-id')).toThrow('Todo not found');
  });
});
