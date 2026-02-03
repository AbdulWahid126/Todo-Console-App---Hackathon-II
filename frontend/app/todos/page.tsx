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
import DashboardLayout from '../../components/DashboardLayout';
import { User, DashboardStats } from '../../lib/types';
import { fetchDashboardStats, getUserProfile } from '../../lib/api';

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('access_token');
        if (!token) {
          window.location.href = '/auth/signin';
          return;
        }

        const [fetchedTodos, fetchedStats, fetchedUser] = await Promise.all([
          fetchTodos(token),
          fetchDashboardStats(token),
          getUserProfile(token)
        ]);

        setTodos(fetchedTodos);
        setStats(fetchedStats);
        setUser(fetchedUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      await deleteTodo(id, token);
      // Optimistically update the UI by removing the deleted todo
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      // Reload todos to revert optimistic update
      const token = localStorage.getItem('access_token');
      if (token) {
        const fetchedTodos = await fetchTodos(token);
        setTodos(fetchedTodos);
      }
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      // Optimistically update the UI
      const updatedTodos = todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      setTodos(updatedTodos);

      // Update on the server
      const updatedTodo = await updateTodo(id, { completed: !todo.completed }, token);

      // Update the local state with the server response to ensure consistency
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === id ? updatedTodo : t)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      // Reload todos to revert optimistic update if the server request failed
      const token = localStorage.getItem('access_token');
      if (token) {
        const fetchedTodos = await fetchTodos(token);
        setTodos(fetchedTodos);
      }
    }
  };

  return (
    <DashboardLayout stats={stats} showAddButton={false}>
      <div className="py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">All Tasks</h1>
            <p className="text-gray-400 mt-1">Manage all your todos in one place</p>
          </div>
          <Link
            href="/todos/new"
            className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg shadow-blue-500/20"
          >
            Create New Todo
          </Link>
        </div>

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <div className="flex justify-center items-center h-64 bg-gray-800/30 rounded-xl border border-gray-700">
            <LoadingSpinner size="lg" label="Loading tasks..." />
          </div>
        ) : (
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
            <TodoList
              todos={todos}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
              loading={loading}
              error={error}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}