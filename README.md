# Simple Todo List Application  
**Built with Spec-Driven Development (SDD)**

This project is a deliberately simple Todo List application, built with **React + Vite** on the frontend and **Node.js** on the backend — but the *real focus* is not the app itself.

The goal of this repository is to **demonstrate Spec-Driven Development (SDD)** in practice.

Using **GitHub Speckit** together with **GitHub Copilot**, the application was designed, specified, and implemented **from explicit specs**, producing a full set of **project artefacts and documentation alongside the code** — not after the fact.

⏱ **Total build time: ~30 minutes**  
That’s roughly the same time it would take to hand-code a similar todo app —  
**the difference is that SDD leaves you with “gold” documentation instead of tribal knowledge.**

---

## Why This Project Exists

Most demo apps show *how to code*.  
This project shows **how to think, specify, and document while coding**.

With Spec-Driven Development:

- Requirements are written before implementation
- Interfaces and contracts are explicit
- Documentation emerges *with* the code, not as a chore later
- AI assistants work from specs, not vague prompts

The result is:

> The same amount of coding time, but vastly better project clarity and artefacts.

---

## What SDD Produced (Beyond the Code)

Alongside the working application, SDD helped generate and refine:

- 📄 Clear feature and behavior specifications  
- 📄 API contracts between frontend and backend  
- 📄 Consistent project structure and boundaries  
- 📄 Living documentation that matches the implementation  

These artefacts are the **real output** of the exercise.

---

## Application Overview

A minimal single-page Todo List application with in-memory storage.

### Features

- ✅ Create new todos  
- ✅ View todos in real time  
- ✅ Mark todos as complete / incomplete  
- ✅ Delete todos  
- ✅ No authentication  
- ✅ No database required  
- ✅ Runs entirely on localhost  

---

## Tech Stack

- **Frontend:** React + Vite  
- **Backend:** Node.js (Express)  
- **Development approach:** Spec-Driven Development (SDD)  
- **Tooling:** GitHub Speckit + GitHub Copilot  

---

## Quick Start

### Prerequisites
- Node.js 18+ LTS  
- npm 8+  

### Installation

```bash
# From the root directory
npm run install-all
npm run dev
```

Then open http://localhost:3000 in your browser.

### Testing

```bash
# Backend tests (unit + integration)
cd backend && npm test

# Frontend tests (components + hooks)
cd frontend && npm test
```

## Project Structure

```
.
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── todos.js        # In-memory data store
│   │   ├── app.js          # Express routes
│   │   ├── server.js       # Express app setup
│   │   └── index.js        # Server entry point
│   ├── __tests__/          # API tests
│   └── package.json
├── frontend/               # React + Vite SPA
│   ├── src/
│   │   ├── api.js          # API client
│   │   ├── useTodos.js     # React hook
│   │   ├── TodoForm.jsx    # Input component
│   │   ├── TodoItem.jsx    # List item component
│   │   ├── TodoList.jsx    # List container
│   │   ├── App.jsx         # Root component
│   │   ├── main.jsx        # Entry point
│   │   └── __tests__/      # Component tests
│   ├── public/index.html
│   ├── vite.config.js
│   └── package.json
└── specs/001-todo-list/    # Feature specification & plan
    ├── spec.md
    ├── plan.md
    └── tasks.md
```

## API Endpoints

### GET /api/todos
List all todos
```bash
curl http://localhost:3001/api/todos
```
Response: `{ success: true, data: [...] }`

### POST /api/todos
Create new todo
```bash
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{ "title": "Buy milk" }'
```
Response: `{ success: true, data: { id, title, completed, createdAt, updatedAt } }`

### PATCH /api/todos/:id
Mark todo complete/incomplete
```bash
curl -X PATCH http://localhost:3001/api/todos/123 \
  -H "Content-Type: application/json" \
  -d '{ "completed": true }'
```

### DELETE /api/todos/:id
Delete todo
```bash
curl -X DELETE http://localhost:3001/api/todos/123
```

## Data Model

```javascript
{
  id: string,              // UUID
  title: string,           // Task title (1-500 chars)
  completed: boolean,      // Completion status
  createdAt: string,       // ISO-8601 timestamp
  updatedAt: string        // ISO-8601 timestamp
}
```

## Development

### Backend Development
```bash
cd backend
npm run dev         # Starts with --watch mode
npm test            # Run tests
npm start           # Production start
```

### Frontend Development
```bash
cd frontend
npm run dev         # Starts dev server on port 3000
npm test            # Run component tests
npm run build       # Production build
```

## Constitution

This project follows the Simple Todo App Constitution (`.specify/memory/constitution.md`):

1. **Simplicity First** — Minimal scope, no unnecessary features
2. **Client-Server Separation** — React frontend, Node.js backend
3. **API-First Design** — REST/JSON contracts defined upfront
4. **In-Memory Storage** — Data persists only during runtime
5. **Test Coverage** — Unit and integration tests required

## Notes

- All data is stored in memory and resets when the server restarts
- Designed for single-user, localhost development only
- No external database or authentication required
- Minimal dependencies for lean, fast development

## Implementation Status

✅ Backend API (Express routes, in-memory store)  
✅ Backend Tests (unit + integration)  
✅ Frontend UI (React components)  
✅ Frontend Tests (component + hook tests)  
✅ API Integration working  

Ready for production-like deployment or feature extensions.
