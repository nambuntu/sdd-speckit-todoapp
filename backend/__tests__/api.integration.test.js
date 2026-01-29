const request = require('supertest');
const app = require('../src/server');
const store = require('../src/todos');

describe('API Endpoints', () => {
  beforeEach(() => {
    store.todos = [];
  });

  test('GET /api/todos returns empty array', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });

  test('POST /api/todos creates todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test task' });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Test task');
  });

  test('POST /api/todos returns 400 for invalid title', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: '' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('GET /api/todos returns created todo', async () => {
    const created = await request(app)
      .post('/api/todos')
      .send({ title: 'Task' });
    
    const res = await request(app).get('/api/todos');
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].id).toBe(created.body.data.id);
  });

  test('PATCH /api/todos/:id marks complete', async () => {
    const created = await request(app)
      .post('/api/todos')
      .send({ title: 'Task' });
    
    const res = await request(app)
      .patch(`/api/todos/${created.body.data.id}`)
      .send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.data.completed).toBe(true);
  });

  test('PATCH /api/todos/:id returns 404 for invalid id', async () => {
    const res = await request(app)
      .patch('/api/todos/invalid-id')
      .send({ completed: true });
    expect(res.status).toBe(404);
  });

  test('DELETE /api/todos/:id deletes todo', async () => {
    const created = await request(app)
      .post('/api/todos')
      .send({ title: 'Task' });
    
    const res = await request(app).delete(`/api/todos/${created.body.data.id}`);
    expect(res.status).toBe(200);
    
    const get = await request(app).get('/api/todos');
    expect(get.body.data).toHaveLength(0);
  });
});
