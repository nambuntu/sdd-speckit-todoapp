import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../src/TodoItem';

describe('TodoItem', () => {
  const mockTodo = { id: '1', title: 'Test', completed: false };

  it('renders todo title', () => {
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('calls onToggle when checkbox clicked', () => {
    const mock = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={mock} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mock).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete clicked', () => {
    const mock = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={mock} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(mock).toHaveBeenCalledWith('1');
  });
});
