/**
 * Edit todo page for the Todo Application
 * Task: P2-T-067, P2-T-068, P2-T-069, P2-T-080
 * From: specs/phase-ii/plan
 * Implements todo editing with data fetching as required by constitution VII. Clean Architecture & Stateless Services
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Todo, TodoUpdateData } from '../../../../lib/types';
import { fetchTodoById, updateTodo } from '../../../../lib/api';
import TodoForm from '../../../../components/TodoForm';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import ErrorMessage from '../../../../components/ErrorMessage';

export default function EditTodoPage() {
  const router = useRouter();
  const params = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the todo to edit
  useEffect(() => {
    const loadTodo = async () => {
      try {
        setLoading(true);
        setError(null);
        const todoId = params.id as string;
        const fetchedTodo = await fetchTodoById(todoId);
        setTodo(fetchedTodo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load todo for editing');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadTodo();
    }
  }, [params.id]);

  const handleSubmit = async (data: TodoUpdateData) => {
    setError(null);

    try {
      if (!todo) return;

      const updatedTodo = await updateTodo(todo.id, data);

      // Redirect back to the todo list after successful update
      router.push('/todos');
      router.refresh(); // Refresh to ensure data is up to date
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const handleCancel = () => {
    router.push('/todos'); // Go back to todo list
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" label="Loading todo..." />
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="max-w-2xl mx-auto py-6">
        <div className="mb-6">
          <Link href="/todos" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to Todos
          </Link>
        </div>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="max-w-2xl mx-auto py-6">
        <div className="mb-6">
          <Link href="/todos" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to Todos
          </Link>
        </div>
        <ErrorMessage message={`Todo with ID ${params.id} not found`} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="mb-6">
        <Link href="/todos" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          ← Back to Todos
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Edit Todo</h1>

        {error && <ErrorMessage message={error} />}

        <TodoForm
          initialData={todo}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}