# Simple Todo App Constitution

## Core Principles

### I. Simplicity First
Keep the application lean and minimal. Follow YAGNI (You Aren't Gonna Need It) principles. Every feature must have a clear user value; no speculative infrastructure. The app solves one problem: managing a todo list.

### II. Client-Server Separation
React frontend (presentation layer) and Node.js backend (data/logic layer) must communicate via REST API. Each layer is independently testable and deployable. Clear boundaries with well-defined contracts.

### III. API-First Design
All backend functionality exposed via REST endpoints. API contracts defined before implementation. Frontend depends on API contracts, not internal implementation details. Requests/responses use JSON.

### IV. In-Memory Storage
All data stored in memory only. No database persistence. Data resets when application restarts. Single data store per backend instance (suitable for single-user, localhost environment).

### V. Test Coverage
Both frontend (React components) and backend (API endpoints) must have unit tests. Integration tests verify frontend-backend communication. Tests written before or alongside implementation.

## Technology Stack

- **Frontend**: React 18+ (single-page app)
- **Backend**: Node.js + Express.js
- **Data Storage**: In-memory JavaScript objects
- **Testing**: Jest (backend), React Testing Library (frontend)
- **HTTP**: REST API (JSON)

## Constraints & Requirements

- **Deployment**: Localhost only (development environment)
- **Users**: Single user, no authentication/authorization required
- **Persistence**: None (in-memory only)
- **Scope**: Two core features only:
  1. Create new todos (with title/description)
  2. Mark todos complete (toggle status)
- **Performance**: No specific targets (small scale)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Development Workflow

1. **Feature Definition**: Spec out todo feature requirements clearly
2. **API Design**: Define backend endpoint signatures and data models
3. **Test Writing**: Write tests for both frontend and backend
4. **Implementation**: Develop features to pass tests
5. **Integration**: Verify frontend-backend communication works end-to-end
6. **Code Review**: Verify compliance with constitution before merging

## Governance

The constitution supersedes all other practices. All features must comply with these principles before implementation begins. Amendments require documentation and clear ratification. When in doubt, choose simplicity over flexibility.

**Version**: 1.0.0 | **Ratified**: 2026-01-29 | **Last Amended**: 2026-01-29
