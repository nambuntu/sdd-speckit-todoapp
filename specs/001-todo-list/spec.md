# Feature Specification: 001-todo-list

**Feature ID**: 001-todo-list  
**Title**: Simple Todo List Application  
**Status**: Specification  
**Date Created**: 2026-01-29

## Overview

Build a minimal todo list application with React frontend and Node.js backend. Users can create todos, view them in a list, and mark them as complete. All data stored in-memory; no authentication required.

## User Stories

### Story 1: View Todo List
**As a** user  
**I want to** see my todo list immediately when I open the app  
**So that** I can quickly review my tasks

**Acceptance Criteria:**
- App loads at localhost without login
- Empty list shows placeholder message on first load
- List displays all current todos with title and completion status

### Story 2: Create New Todo
**As a** user  
**I want to** create a new todo with a title  
**So that** I can add tasks to my list

**Acceptance Criteria:**
- Input field available to enter todo title
- "Add" button submits the todo
- New todo appears immediately in the list
- Input field clears after submission
- New todos are incomplete by default

### Story 3: Mark Todo as Complete
**As a** user  
**I want to** mark a todo as complete  
**So that** I can track my progress

**Acceptance Criteria:**
- Each todo has a checkbox or toggle
- Clicking completes/uncompletes the todo
- Completed todos visually distinguished (strikethrough or dimmed)
- Completion status persists in the session (while app is running)

## Technical Requirements

### Frontend (React)
- Single page application
- No routing (single view)
- Component structure: App → TodoList → TodoItem, TodoForm
- State management: React hooks (useState, useEffect)
- Styling: CSS or CSS-in-JS (minimal)
- API calls via `fetch()` to backend

### Backend (Node.js + Express)
- REST API endpoints:
  - `GET /api/todos` — Retrieve all todos
  - `POST /api/todos` — Create new todo
  - `PATCH /api/todos/:id` — Update todo (mark complete)
  - `DELETE /api/todos/:id` — Delete todo (optional)
- In-memory data store (JavaScript array/object)
- CORS enabled for localhost frontend
- Server runs on port 3001 (or configurable)

### Data Model
```javascript
{
  id: string (UUID or timestamp),
  title: string,
  completed: boolean,
  createdAt: ISO-8601 timestamp
}
```

### Environment
- Frontend: React 18+ (running on localhost:3000)
- Backend: Node.js 18+ with Express.js (running on localhost:3001)
- No database required
- No authentication/authorization
- Single user session

## Research/Investigation Needed
- [ ] Finalize folder structure (monorepo vs separate repos)
- [ ] Decide on build tooling (Vite, Create React App, Webpack)
- [ ] Choose testing frameworks (Jest, React Testing Library, Supertest)
- [ ] Decide on styling approach (CSS modules, Tailwind, styled-components)
- [ ] Define API response formats (success/error structure)

## Constraints
- No authentication system
- In-memory storage only
- Localhost deployment only
- Single user
- No database required
- Minimal dependencies

## Success Metrics
- App loads without errors
- User can create, view, and complete todos
- Frontend and backend communicate via REST API
- Both frontend and backend have test coverage >80%
- App runs on localhost:3000 (frontend) and localhost:3001 (backend)
