'use client';

import React from 'react';
import { Pencil, Trash2, Calendar as CalendarIcon, Tag as TagIcon } from 'lucide-react';
import { TaskSummary } from '@/lib/types';

interface TaskCardProps {
    task: TaskSummary;
    onEdit: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    onToggleComplete: (taskId: string, currentStatus: boolean) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
    const priorityColors = {
        high: 'bg-red-500/20 text-red-400 border-red-500/50',
        medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
        low: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    };

    const priorityColor = priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.medium;

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    {/* Title */}
                    <h3 className={`text-lg font-semibold text-white mb-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                    </h3>

                    {/* Description */}
                    {task.description && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{task.description}</p>
                    )}

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        {/* Priority */}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${priorityColor} capitalize`}>
                            {task.priority}
                        </span>

                        {/* Category */}
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600">
                            <TagIcon className="w-3 h-3 mr-1" />
                            {task.category}
                        </span>

                        {/* Due Date */}
                        {task.due_date && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600">
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                {new Date(task.due_date).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    {/* Status */}
                    <button
                        onClick={() => onToggleComplete(task.id, task.completed)}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${task.completed
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                            } hover:opacity-80 transition-opacity`}
                    >
                        {task.completed ? '✓ Completed' : 'Active'}
                    </button>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 ml-4">
                    <button
                        onClick={() => onEdit(task.id)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors"
                        title="Edit task"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                        title="Delete task"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
