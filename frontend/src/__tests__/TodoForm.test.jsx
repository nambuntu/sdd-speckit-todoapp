import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from '../src/TodoForm';

describe('TodoForm', () => {
  it('renders input and button', () => {
    const mock = vi.fn();
    render(<TodoForm onAddTodo={mock} loading={false} />);
    expect(screen.getByPlaceholderText('Enter a new todo...')).toBeTruthy();
    expect(screen.getByText('Add Todo')).toBeTruthy();
  });

  it('calls onAddTodo on submit', () => {
    const mock = vi.fn();
    render(<TodoForm onAddTodo={mock} loading={false} />);
    const input = screen.getByPlaceholderText('Enter a new todo...');
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(screen.getByText('Add Todo'));
    expect(mock).toHaveBeenCalledWith('Test');
  });

  it('clears input after submit', () => {
    const mock = vi.fn();
    render(<TodoForm onAddTodo={mock} loading={false} />);
    const input = screen.getByPlaceholderText('Enter a new todo...');
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(screen.getByText('Add Todo'));
    expect(input.value).toBe('');
  });
});
