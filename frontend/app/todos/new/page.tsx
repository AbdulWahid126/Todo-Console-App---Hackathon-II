/**
 * Create new todo page for the Todo Application
 * Task: P2-T-066, P2-T-079
 * From: specs/phase-ii/plan
 * Implements todo creation form as required by constitution VII. Clean Architecture & Stateless Services
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createTodo } from '../../../lib/api';
import { TodoCreateData } from '../../../lib/types';
import TodoForm from '../../../components/TodoForm';
import ErrorMessage from '../../../components/ErrorMessage';

export default function CreateTodoPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: TodoCreateData) => {
    setSubmitting(true);
    setError(null);

    try {
      await createTodo(data);
      router.push('/todos'); // Redirect to todo list after successful creation
      router.refresh(); // Refresh to ensure data is up to date
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/todos'); // Go back to todo list
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="mb-6">
        <Link href="/todos" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          ← Back to Todos
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Create New Todo</h1>

        {error && <ErrorMessage message={error} />}

        <TodoForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={undefined}
        />

        {submitting && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-3"></div>
              <span>Creating todo...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}