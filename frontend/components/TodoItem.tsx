/**
 * TodoItem component for displaying a single todo
 * Task: P2-T-022, P2-T-034, P2-T-035
 * From: specs/phase-ii/plan
 * Implements single todo display with actions as required by constitution VII. Clean Architecture & Stateless Services
 */

import React from 'react';
import { Todo } from '../lib/types';
import Link from 'next/link';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggleComplete, onDelete }: TodoItemProps) {
  const handleToggle = () => {
    onToggleComplete(todo.id);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      onDelete(todo.id);
    }
  };

  return (
    <div className={`border rounded-lg p-4 mb-3 flex items-start ${todo.completed ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex items-center mr-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
      </div>

      <div className="flex-grow">
        <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className={`mt-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
            {todo.description}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Created: {new Date(todo.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="flex space-x-2 ml-2">
        <Link
          href={`/todos/${todo.id}/edit`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}