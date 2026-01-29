# Implementation Tasks: Simple Todo List Application

**Feature ID**: 001-todo-list  
**Phase**: 2 - Implementation  
**Plan Reference**: [specs/001-todo-list/plan.md](../../specs/001-todo-list/plan.md)  
**Date**: 2026-01-29

---

## Task Overview

This document breaks Phase 1 design into concrete Phase 2 implementation tasks. Tasks are organized by component/layer and should be completed in dependency order.

**Total Estimated Tasks**: 18 core + 5 optional  
**Estimated Timeline**: 3-5 days (for experienced developers)

---

## Task Categories

### Category A: Project Setup & Configuration (3 tasks)
### Category B: Backend Implementation (6 tasks)
### Category C: Frontend Implementation (6 tasks)
### Category D: Testing & Integration (3 tasks)
### Category E: Polish & Documentation (1 task)
### Category F: Optional Enhancements (5 tasks)

---

## CATEGORY A: Project Setup & Configuration

### Task A1: Initialize Monorepo Structure
**Description**: Set up project root with frontend/ and backend/ directories  
**Acceptance Criteria**:
- [ ] Root `package.json` with `workspaces` or `lerna` config (or just two separate projects)
- [ ] Root `.gitignore` covers both frontend and backend
- [ ] `.specify/scripts/` contains dev startup script (runs both frontend & backend concurrently)
- [ ] README.md with project overview and startup instructions
- [ ] Both `frontend/` and `backend/` directories created with basic structure

**Definition of Done**: Root scripts run `npm install` and `npm run dev` to start both servers

**Dependencies**: None (start here)

---

### Task A2: Setup Backend (Node.js + Express)
**Description**: Initialize Node.js project with Express, dependencies, and folder structure  
**Acceptance Criteria**:
- [ ] `backend/package.json` with dependencies: `express`, `cors`, `uuid` (or `nanoid`)
- [ ] `backend/package.json` dev dependencies: `jest`, `supertest`, `nodemon`
- [ ] Scripts configured: `npm start`, `npm run dev`, `npm test`
- [ ] Folder structure created: `src/`, `__tests__/`, `.env.example`
- [ ] `.env` support (use `dotenv` or simple config)
- [ ] Server runs on port 3001 by default (configurable via `process.env.PORT`)
- [ ] `src/index.js` entry point ready (empty Express app)

**Definition of Done**: `npm run dev` starts server on port 3001 without errors

**Dependencies**: A1

---

### Task A3: Setup Frontend (React)
**Description**: Initialize React project with build tooling and folder structure  
**Acceptance Criteria**:
- [ ] `frontend/package.json` with dependencies: `react`, `react-dom`, `axios` (or use fetch)
- [ ] `frontend/package.json` dev dependencies: `jest`, `react-testing-library`, `@testing-library/jest-dom`
- [ ] Build tool choice: Vite, Create React App, or Webpack (Vite recommended for speed)
- [ ] Scripts configured: `npm start`, `npm run build`, `npm test`
- [ ] Folder structure: `src/`, `public/`, `.env.example`
- [ ] `.env` file supports `REACT_APP_API_URL=http://localhost:3001` (or `VITE_API_URL`)
- [ ] `src/index.jsx` or `src/main.jsx` entry point ready
- [ ] `src/App.jsx` skeleton created (empty component)
- [ ] Basic `src/App.css` (empty, ready for styling)

**Definition of Done**: `npm start` launches dev server on port 3000 without errors

**Dependencies**: A1

---

## CATEGORY B: Backend Implementation

### Task B1: Implement In-Memory Todo Store
**Description**: Create `backend/src/models/Todo.js` - in-memory data store  
**Acceptance Criteria**:
- [ ] `TodoStore` class with methods:
  - `getAll()` → returns array of all todos
  - `getById(id)` → returns single todo or undefined
  - `create(title)` → creates new todo, returns created todo object
  - `updateStatus(id, completed)` → updates todo completion status
  - `delete(id)` → removes todo, returns true if deleted
- [ ] Todo object structure matches plan: `{ id, title, completed, createdAt, updatedAt }`
- [ ] ID generation using `uuid` or `nanoid`
- [ ] Timestamps in ISO-8601 format
- [ ] Store initialized as singleton (global instance)
- [ ] Input validation: title required, 1-500 characters

**Definition of Done**: 
- All methods implemented and exported
- Store can be imported and used: `const store = new TodoStore()`

**Dependencies**: A2

---

### Task B2: Create Todo Routes (Express)
**Description**: Implement `backend/src/routes/todos.js` - REST API endpoints  
**Acceptance Criteria**:
- [ ] `GET /api/todos` — List all todos
  - Response: `{ success: true, data: [] }`
  - Status: 200
- [ ] `POST /api/todos` — Create new todo
  - Body: `{ title: string }`
  - Response: `{ success: true, data: { id, title, completed, createdAt, updatedAt } }`
  - Status: 201
  - Validation error: 400 with error object if title invalid
- [ ] `PATCH /api/todos/:id` — Update todo completion
  - Body: `{ completed: boolean }`
  - Response: `{ success: true, data: {...} }`
  - Status: 200
  - Not found: 404 if id doesn't exist
- [ ] `DELETE /api/todos/:id` — Delete todo (optional)
  - Response: `{ success: true }`
  - Status: 200
  - Not found: 404 if id doesn't exist
- [ ] All endpoints use Express Router
- [ ] CORS headers enabled
- [ ] Error responses follow format: `{ success: false, error: { code, message, details } }`

**Definition of Done**: Routes exported and ready to mount in app.js

**Dependencies**: B1

---

### Task B3: Setup Express App & Middleware
**Description**: Create `backend/src/app.js` - Express application setup  
**Acceptance Criteria**:
- [ ] Express app created and configured
- [ ] CORS middleware enabled (allow localhost:3000)
- [ ] JSON body parser middleware
- [ ] Mount `/api/todos` routes from B2
- [ ] 404 handler for unknown routes
- [ ] Global error handler middleware (catches and formats errors)
- [ ] Logging middleware (console.log requests - simple)
- [ ] App exported as module (ready for `index.js` to use)

**Definition of Done**: App can be imported and tested independently

**Dependencies**: B2

---

### Task B4: Create Backend Entry Point
**Description**: Create `backend/src/index.js` - Server startup  
**Acceptance Criteria**:
- [ ] Import and start Express app from `app.js`
- [ ] Read port from `process.env.PORT` (default: 3001)
- [ ] Console log when server starts: "Server running on http://localhost:PORT"
- [ ] Handle SIGTERM/SIGINT for graceful shutdown
- [ ] Error handling for startup failures

**Definition of Done**: `npm run dev` starts the backend successfully

**Dependencies**: B3

---

### Task B5: Write Backend Unit Tests
**Description**: Create `backend/__tests__/todos.test.js` - TodoStore unit tests  
**Acceptance Criteria**:
- [ ] Test suite for TodoStore class with >80% coverage
- [ ] Tests for `getAll()` method
- [ ] Tests for `create()` method (success & validation)
- [ ] Tests for `getById()` method
- [ ] Tests for `updateStatus()` method
- [ ] Tests for `delete()` method
- [ ] Tests for error cases (invalid title, missing id, etc.)
- [ ] Use Jest matchers and describe/it blocks
- [ ] Clear test names describing behavior

**Definition of Done**: `npm test` runs all tests; all pass

**Dependencies**: B1

---

### Task B6: Write Backend API Integration Tests
**Description**: Create `backend/__tests__/api.integration.test.js` - API endpoint tests  
**Acceptance Criteria**:
- [ ] Use Supertest to test Express endpoints
- [ ] Test `GET /api/todos` (empty state)
- [ ] Test `POST /api/todos` (create todo)
- [ ] Test `GET /api/todos` (verify todo in list)
- [ ] Test `PATCH /api/todos/:id` (mark complete)
- [ ] Test `DELETE /api/todos/:id` (optional)
- [ ] Test validation errors (400 status)
- [ ] Test 404 errors (todo not found)
- [ ] Test response format (success envelope)
- [ ] >70% API coverage

**Definition of Done**: `npm test` runs all tests; all pass

**Dependencies**: B3, B4

---

## CATEGORY C: Frontend Implementation

### Task C1: Create Todo API Service
**Description**: Create `frontend/src/services/api.js` - API client  
**Acceptance Criteria**:
- [ ] Fetch or Axios wrapper for API calls
- [ ] Base URL from environment variable `REACT_APP_API_URL` (default: http://localhost:3001)
- [ ] Exported functions:
  - `fetchTodos()` → `GET /api/todos`
  - `createTodo(title)` → `POST /api/todos`
  - `updateTodo(id, completed)` → `PATCH /api/todos/:id`
  - `deleteTodo(id)` → `DELETE /api/todos/:id` (optional)
- [ ] Error handling (throw meaningful errors)
- [ ] Response parsing (extract `data` from success envelope)

**Definition of Done**: Module can be imported and functions callable

**Dependencies**: A3

---

### Task C2: Create useTodos Custom Hook
**Description**: Create `frontend/src/hooks/useTodos.js` - State management for todos  
**Acceptance Criteria**:
- [ ] React custom hook using `useState` and `useEffect`
- [ ] Initialize with `useState([])` for todos list
- [ ] `useEffect` to fetch todos on component mount
- [ ] Exported functions:
  - `todos` — current todos array
  - `loading` — loading state
  - `error` — error state
  - `addTodo(title)` — calls `createTodo()`, updates state
  - `toggleTodo(id)` — calls `updateTodo()`, toggles completion
  - `deleteTodo(id)` — calls `deleteTodo()`, updates state (optional)
- [ ] Error handling with user-friendly messages
- [ ] Loading states for UI feedback
- [ ] Optimistic updates (update UI immediately, then API call)

**Definition of Done**: Hook can be imported and used in components

**Dependencies**: C1

---

### Task C3: Implement TodoForm Component
**Description**: Create `frontend/src/components/TodoForm.jsx`  
**Acceptance Criteria**:
- [ ] Controlled input for todo title
- [ ] Submit button labeled "Add Todo"
- [ ] Form submission via `onSubmit` handler (not onClick)
- [ ] Calls parent `onAddTodo(title)` prop with title
- [ ] Input validation: trim, check length, require non-empty
- [ ] Clears input after successful submission
- [ ] Disabled state while loading (if loading prop provided)
- [ ] Placeholder text: "Enter a new todo..."
- [ ] Basic styling (clean, minimal)

**Definition of Done**: Component renders and accepts onAddTodo prop

**Dependencies**: A3

---

### Task C4: Implement TodoItem Component
**Description**: Create `frontend/src/components/TodoItem.jsx`  
**Acceptance Criteria**:
- [ ] Displays todo title
- [ ] Checkbox input for completion status
- [ ] Clicking checkbox calls `onToggle(id)` prop
- [ ] Completed todos styled distinctly (strikethrough or dimmed)
- [ ] Optional delete button calling `onDelete(id)` prop
- [ ] Show loading state while toggling
- [ ] Clean, minimal styling
- [ ] Accessible: proper labels, ARIA attributes

**Definition of Done**: Component renders with todo prop and callbacks

**Dependencies**: A3

---

### Task C5: Implement TodoList Component
**Description**: Create `frontend/src/components/TodoList.jsx`  
**Acceptance Criteria**:
- [ ] Displays array of todos as TodoItem components
- [ ] Empty state message: "No todos yet. Add one to get started!"
- [ ] Maps each todo to `<TodoItem key={id} todo={todo} onToggle={...} onDelete={...} />`
- [ ] Passes callbacks: `onToggle`, `onDelete` to child components
- [ ] Shows loading state if provided
- [ ] Shows error state if provided
- [ ] Clean styling, responsive layout

**Definition of Done**: Component renders todos list and empty state

**Dependencies**: C4

---

### Task C6: Implement App Component (Main)
**Description**: Create `frontend/src/App.jsx` - Root component  
**Acceptance Criteria**:
- [ ] Import and use `useTodos()` hook for state management
- [ ] Render `<TodoForm onAddTodo={addTodo} loading={loading} />`
- [ ] Render `<TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />`
- [ ] Display loading spinner while fetching initial todos
- [ ] Display error message if API fails
- [ ] Clean layout with title "My Todo List"
- [ ] Basic styling (CSS or CSS-in-JS)
- [ ] Responsive design (works on desktop, tablet, mobile)

**Definition of Done**: App loads, displays todos, allows create/toggle

**Dependencies**: C2, C3, C5

---

## CATEGORY D: Testing & Integration

### Task D1: Write Frontend Component Tests
**Description**: Create `frontend/src/__tests__/` test files for components  
**Acceptance Criteria**:
- [ ] Test TodoForm component:
  - Renders input and button
  - Calls onAddTodo when form submitted
  - Clears input after submission
  - Shows validation errors
- [ ] Test TodoItem component:
  - Displays todo title
  - Checkbox toggles onToggle callback
  - Completed state visual distinction
- [ ] Test TodoList component:
  - Renders todos as list
  - Shows empty state
  - Passes callbacks to children
- [ ] Use React Testing Library (not enzyme)
- [ ] Test user interactions, not implementation details
- [ ] >70% component coverage

**Definition of Done**: `npm test` passes all frontend tests

**Dependencies**: C3, C4, C5

---

### Task D2: Write Frontend Hook Tests
**Description**: Create `frontend/src/__tests__/useTodos.test.js`  
**Acceptance Criteria**:
- [ ] Mock API service calls (axios/fetch)
- [ ] Test `useTodos()` hook initialization (empty todos)
- [ ] Test `addTodo()` function (creates todo, updates state)
- [ ] Test `toggleTodo()` function (updates completion status)
- [ ] Test error handling (API failure)
- [ ] Test loading states
- [ ] Use `renderHook` from testing-library
- [ ] >70% hook coverage

**Definition of Done**: `npm test` passes all hook tests

**Dependencies**: C2

---

### Task D3: End-to-End Integration Test
**Description**: Create basic E2E test verifying frontend-backend integration  
**Acceptance Criteria**:
- [ ] Start both backend and frontend servers
- [ ] Test user flow:
  - User sees empty todo list
  - User creates new todo
  - Todo appears in list
  - User marks todo complete
  - Completion status persists
- [ ] Use Cypress or Playwright (or simple Supertest + fetch)
- [ ] Test against real API (not mocked)
- [ ] Verify response times <500ms

**Definition of Done**: E2E test passes; frontend-backend communication confirmed

**Dependencies**: B4, C6

---

## CATEGORY E: Polish & Documentation

### Task E1: Complete Documentation
**Description**: Finalize project documentation  
**Acceptance Criteria**:
- [ ] Update root `README.md` with:
  - Project overview
  - Features list
  - Prerequisites (Node.js version)
  - Installation instructions (`npm install` in both directories)
  - How to run (`npm run dev` from root)
  - How to test (`npm test`)
  - API documentation (endpoints, examples)
  - Architecture diagram (text or ASCII)
- [ ] Create `frontend/README.md` with component docs
- [ ] Create `backend/README.md` with API docs and schema
- [ ] `.env.example` files in both directories
- [ ] CONTRIBUTING.md with development guidelines
- [ ] Constitution reference in main docs

**Definition of Done**: Documentation complete and reviewed

**Dependencies**: All implementation tasks

---

## CATEGORY F: Optional Enhancements (Lower Priority)

### Task F1: Add Todo Categories/Tags
**Description**: Allow todos to have category tags  
**Acceptance Criteria**: Add optional `category` field to Todo model, filter by category in UI

**Dependencies**: B1, C6

---

### Task F2: Implement Local Storage Persistence
**Description**: Save todos to browser localStorage  
**Acceptance Criteria**: 
- Frontend syncs with localStorage
- Data persists across page refreshes (session-local)

**Note**: Conflicts with "in-memory only" requirement; include only if stakeholder approves

**Dependencies**: C2

---

### Task F3: Add Due Date Feature
**Description**: Add optional `dueDate` to todos  
**Acceptance Criteria**: Date picker in TodoForm, display in TodoItem

**Dependencies**: B1, C3, C4

---

### Task F4: Dark Mode Theme
**Description**: Add theme toggle (light/dark)  
**Acceptance Criteria**: Button to toggle theme, persist preference in localStorage

**Dependencies**: C6

---

### Task F5: Drag-and-Drop Reordering
**Description**: Allow users to drag todos to reorder  
**Acceptance Criteria**: Reorder endpoint, drag UI library integration

**Dependencies**: B2, C5

---

## Task Execution Order

### Sprint 1: Setup & Backend
1. **A1** → Initialize monorepo
2. **A2** → Setup backend
3. **B1** → In-memory store
4. **B2** → Routes
5. **B3** → Express app
6. **B4** → Entry point
7. **B5** → Unit tests
8. **B6** → Integration tests

### Sprint 2: Frontend
1. **A3** → Setup frontend
2. **C1** → API service
3. **C2** → Custom hook
4. **C3** → TodoForm
5. **C4** → TodoItem
6. **C5** → TodoList
7. **C6** → App component
8. **D1** → Component tests
9. **D2** → Hook tests

### Sprint 3: Integration & Polish
1. **D3** → E2E tests
2. **E1** → Documentation
3. Optional: **F1-F5** → Enhancements

---

## Success Criteria

✅ **Phase 2 Complete When**:
- [ ] All tasks A1-E1 completed
- [ ] Backend: `npm test` passes, 100% core coverage
- [ ] Frontend: `npm test` passes, 70%+ coverage
- [ ] E2E tests pass (frontend-backend communication works)
- [ ] App runs: `npm run dev` starts both servers
- [ ] User can create, view, and complete todos
- [ ] All documentation complete
- [ ] Code reviewed against constitution principles
- [ ] No ERRORS or CRITICAL WARNINGs in console/logs

---

## Notes

- **No Phase 0 Research Required**: Plan already defines all technical details; research was completed in plan.md
- **Parallel Work**: Teams can work on frontend (C1-C6) and backend (B1-B6) simultaneously after setup
- **Timelines**: Each task estimated 1-4 hours for experienced developers
- **Review Gates**: Constitution compliance checked at E1 before release
