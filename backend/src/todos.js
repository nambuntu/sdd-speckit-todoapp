const { v4: uuid } = require('uuid');

class TodoStore {
  constructor() {
    this.todos = [];
  }

  getAll() {
    return [...this.todos];
  }

  getById(id) {
    return this.todos.find(t => t.id === id);
  }

  create(title) {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Title required');
    }
    if (title.length > 500) {
      throw new Error('Title too long');
    }
    
    const todo = {
      id: uuid(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.todos.push(todo);
    return todo;
  }

  updateStatus(id, completed) {
    const todo = this.getById(id);
    if (!todo) throw new Error('Todo not found');
    
    todo.completed = Boolean(completed);
    todo.updatedAt = new Date().toISOString();
    return todo;
  }

  delete(id) {
    const idx = this.todos.findIndex(t => t.id === id);
    if (idx === -1) throw new Error('Todo not found');
    
    this.todos.splice(idx, 1);
    return true;
  }
}

module.exports = new TodoStore();
