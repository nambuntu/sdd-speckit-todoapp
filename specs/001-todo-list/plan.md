# Implementation Plan: Simple Todo List Application

**Branch**: `001-todo-list-mvp` | **Date**: 2026-01-29 | **Spec**: [specs/001-todo-list/spec.md](../../specs/001-todo-list/spec.md)

**Note**: This plan follows the `/speckit.plan` workflow and is based on the project constitution.

## Summary

Build a minimal single-page todo list application. Users can create todos, view them in a list, and mark them as complete. React frontend communicates with Node.js backend via REST API. All data stored in-memory; no authentication required. Suitable for single-user, localhost development environment.

## Technical Context

**Language/Version**: JavaScript/TypeScript
- Frontend: React 18+ (modern ES6+)
- Backend: Node.js 18+ LTS

**Primary Dependencies**:
- Frontend: React, React DOM, Axios or Fetch API
- Backend: Express.js, CORS middleware
- Testing: Jest, React Testing Library (frontend), Supertest (backend)

**Storage**: In-memory JavaScript objects (array for todos, reset on server restart)

**Testing**: 
- Frontend: Jest + React Testing Library
- Backend: Jest + Supertest
- Integration: Cypress or Playwright (optional for MVP)

**Target Platform**: Web (modern browsers on localhost)

**Project Type**: Monorepo (frontend/ and backend/ directories) or separate repos

**Performance Goals**: Sub-200ms API responses (simple in-memory operations), UI renders <16ms (60 FPS)

**Constraints**: 
- Localhost only (no production deployment)
- Single user (no concurrent sessions)
- In-memory storage (no persistence between restarts)
- <2 second initial app load time

**Scale/Scope**: 
- Max 100-500 todos in session (memory bounded)
- Single instance, no clustering
- MVP focuses on core features only (create, view, complete)

## Constitution Check

**Status**: ✅ PASSES - Feature aligns with all 5 core principles

1. ✅ **Simplicity First** — Minimal scope (2 operations only), no speculative features
2. ✅ **Client-Server Separation** — Clean React frontend and Express backend
3. ✅ **API-First Design** — REST endpoints with JSON contracts defined in Phase 1
4. ✅ **In-Memory Storage** — All data in-memory as specified
5. ✅ **Test Coverage** — Plans for both frontend and backend unit tests

**Technology Stack Compliance**: ✅ React 18+, Node.js, Express, Jest/React Testing Library
**Constraints Met**: ✅ Localhost, single-user, no auth, in-memory storage

## Project Structure

### Documentation (this feature)

```
specs/001-todo-list/
├── spec.md                      # Feature specification
├── plan.md                       # This file (Phase 1 output)
├── research.md                   # Phase 0 output (TBD)
├── data-model.md                 # Phase 1 output (TBD)
├── quickstart.md                 # Phase 1 output (TBD)
├── contracts/                    # Phase 1 output (TBD)
│   ├── api.md                    # API contract
│   └── components.md             # Component contract
└── tasks.md                      # Phase 2 output (TBD - created by /speckit.tasks)
```

### Source Code (repository root)

```
/
├── frontend/                     # React SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoList.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoForm.jsx
│   │   ├── hooks/
│   │   │   └── useTodos.js       # Custom hook for API calls
│   │   ├── services/
│   │   │   └── api.js            # Axios/Fetch API client
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .gitignore
├── backend/                      # Express REST API
│   ├── src/
│   │   ├── routes/
│   │   │   └── todos.js          # Todo routes
│   │   ├── models/
│   │   │   └── Todo.js           # In-memory Todo store
│   │   ├── controllers/
│   │   │   └── todoController.js
│   │   ├── middleware/
│   │   │   └── cors.js           # CORS config
│   │   ├── app.js                # Express app
│   │   └── index.js              # Entry point
│   ├── __tests__/
│   │   ├── todos.test.js
│   │   └── api.integration.test.js
│   ├── package.json
│   └── .gitignore
├── specs/001-todo-list/          # This feature's spec
├── .specify/                     # Speckit configuration
└── README.md
```

## Phase 0: Research (TBD)

Investigate and document:
- [ ] Monorepo vs separate repositories (recommend monorepo with root scripts)
- [ ] Build tooling for React (Vite vs Create React App vs Webpack)
- [ ] Testing strategy and frameworks (Jest setup, React Testing Library patterns)
- [ ] API response format standardization (success/error envelope)
- [ ] Styling approach (CSS modules, Tailwind, plain CSS)
- [ ] Development server setup (concurrent frontend/backend)
- [ ] Port configuration and environment variables

**Output**: `research.md`

## Phase 1: Design & Data Model (Current - In Progress)

### Data Model

**Todo Object**
```javascript
{
  id: string,              // UUID v4 or nanoid
  title: string,           // User-provided task title (required, 1-500 chars)
  completed: boolean,      // Default: false
  createdAt: string,       // ISO-8601 timestamp
  updatedAt: string        // ISO-8601 timestamp
}
```

**In-Memory Store** (JavaScript array)
```javascript
// todos.js - simple array-based store
class TodoStore {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }
  
  getAll() { return [...this.todos]; }
  getById(id) { return this.todos.find(t => t.id === id); }
  create(title) { /* ... */ }
  updateStatus(id, completed) { /* ... */ }
  delete(id) { /* ... */ }
}
```

### API Contracts

**Base URL**: `http://localhost:3001/api`

**Endpoints**:

1. **GET /todos** — List all todos
   - Response: `{ success: true, data: Todo[] }`
   - Status: 200

2. **POST /todos** — Create new todo
   - Request: `{ title: string }`
   - Response: `{ success: true, data: Todo }`
   - Status: 201
   - Validation: title required, 1-500 chars

3. **PATCH /todos/:id** — Update todo (mark complete/incomplete)
   - Request: `{ completed: boolean }`
   - Response: `{ success: true, data: Todo }`
   - Status: 200
   - Error: 404 if todo not found

4. **DELETE /todos/:id** — Delete todo (optional for MVP)
   - Response: `{ success: true }`
   - Status: 200
   - Error: 404 if todo not found

**Error Response Format**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": {}
  }
}
```

### Component Architecture (React)

**App** (root)
- Manages global todo state
- Renders TodoForm + TodoList
- Handles API communication

**TodoForm**
- Input field for new todo
- Submit button
- Calls parent handler `onAddTodo(title)`

**TodoList**
- Displays all todos
- Maps todos to TodoItem components
- Empty state message

**TodoItem**
- Title display
- Checkbox for completion status
- Delete button (optional)
- Calls parent handlers `onToggle(id)`, `onDelete(id)`

**Custom Hook: useTodos**
- `todos` state
- `addTodo(title)` — POST /todos
- `toggleTodo(id)` — PATCH /todos/:id
- `deleteTodo(id)` — DELETE /todos/:id
- Handles loading, error states

### Deliverables

**Output Files**:
- `data-model.md` — Detailed data schema, store implementation
- `contracts/api.md` — REST API contract specification
- `contracts/components.md` — React component API documentation
- `quickstart.md` — Getting started guide for developers

**Testing Strategy**:
- Backend: Unit tests for TodoStore, Controller, Routes (>80% coverage)
- Frontend: Component tests for TodoList, TodoItem, TodoForm; Hook tests for useTodos
- Integration: Basic end-to-end test (create todo, verify in list)

## Phase 2: Implementation (TBD)

Will be detailed in `tasks.md` generated by `/speckit.tasks` command.

**Estimated Tasks**:
1. Project setup (monorepo, dependencies, build config)
2. Backend API implementation (Express, routes, store)
3. Backend testing
4. Frontend component implementation (React, styling)
5. Frontend testing
6. Integration testing
7. Documentation & deployment guide
8. Code review & polish

## Next Steps

1. ✅ Constitution check completed (passes all 5 principles)
2. → Run Phase 0 research (TBD)
3. → Complete Phase 1 deliverables (data-model.md, contracts, quickstart.md)
4. → Generate `tasks.md` with Phase 2 implementation tasks

**Blocked By**: None  
**Depends On**: Constitution approval (completed)
