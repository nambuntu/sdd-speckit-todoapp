const express = require('express');
const store = require('./todos');

const router = express.Router();

// GET /api/todos
router.get('/', (req, res) => {
  res.json({ success: true, data: store.getAll() });
});

// POST /api/todos
router.post('/', (req, res) => {
  try {
    const { title } = req.body;
    const todo = store.create(title);
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: err.message }
    });
  }
});

// PATCH /api/todos/:id
router.patch('/:id', (req, res) => {
  try {
    const { completed } = req.body;
    const todo = store.updateStatus(req.params.id, completed);
    res.json({ success: true, data: todo });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: err.message }
    });
  }
});

// DELETE /api/todos/:id
router.delete('/:id', (req, res) => {
  try {
    store.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: err.message }
    });
  }
});

module.exports = router;
