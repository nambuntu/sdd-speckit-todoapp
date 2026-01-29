import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoList } from '../src/TodoList';

describe('TodoList', () => {
  it('shows empty state', () => {
    render(<TodoList todos={[]} onToggle={vi.fn()} onDelete={vi.fn()} loading={false} error={null} />);
    expect(screen.getByText('No todos yet. Add one to get started!')).toBeTruthy();
  });

  it('renders todos', () => {
    const todos = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true }
    ];
    render(<TodoList todos={todos} onToggle={vi.fn()} onDelete={vi.fn()} loading={false} error={null} />);
    expect(screen.getByText('Task 1')).toBeTruthy();
    expect(screen.getByText('Task 2')).toBeTruthy();
  });

  it('shows loading state', () => {
    render(<TodoList todos={[]} onToggle={vi.fn()} onDelete={vi.fn()} loading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('shows error state', () => {
    render(<TodoList todos={[]} onToggle={vi.fn()} onDelete={vi.fn()} loading={false} error="Test error" />);
    expect(screen.getByText(/Error: Test error/)).toBeTruthy();
  });
});
