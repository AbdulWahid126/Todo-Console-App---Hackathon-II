/**
 * Todo list page for the Todo Application
 * Task: P2-T-020, P2-T-024, P2-T-025, P2-T-063-P2-T-065
 * From: specs/phase-ii/plan
 * Implements todo list display with responsive design as required by constitution VII. Clean Architecture & Stateless Services
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Todo } from '../../lib/types';
import { fetchTodos, deleteTodo, updateTodo } from '../../lib/api';
import TodoList from '../../components/TodoList';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      // Optimistically update the UI by removing the deleted todo
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      // Reload todos to revert optimistic update
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      // Optimistically update the UI
      const updatedTodos = todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      setTodos(updatedTodos);

      // Update on the server
      const updatedTodo = await updateTodo(id, { completed: !todo.completed });

      // Update the local state with the server response to ensure consistency
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === id ? updatedTodo : t)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      // Reload todos to revert optimistic update if the server request failed
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Todo List</h1>
        <Link
          href="/todos/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Todo
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" label="Loading todos..." />
        </div>
      ) : (
        <TodoList
          todos={todos}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}