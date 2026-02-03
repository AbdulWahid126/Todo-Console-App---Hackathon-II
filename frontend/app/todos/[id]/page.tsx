'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import ConfirmDialog from '@/components/ConfirmDialog';
import { ToastContainer, ToastType } from '@/components/Toast';
import { Todo, DashboardStats } from '@/lib/types';
import { updateTodo, deleteTodo, fetchDashboardStats } from '@/lib/api';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export default function TodoEditPage() {
    const params = useParams();
    const router = useRouter();
    const todoId = params.id as string;

    const [todo, setTodo] = useState<Todo | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Form fields
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<string>('medium');
    const [category, setCategory] = useState<string>('General');
    const [dueDate, setDueDate] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    window.location.href = '/auth/signin';
                    return;
                }

                // Fetch the specific todo
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1'}/todos/${todoId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch todo');
                }

                const data: Todo = await response.json();
                setTodo(data);

                // Populate form fields
                setTitle(data.title);
                setDescription(data.description || '');
                setPriority(data.priority || 'medium');
                setCategory(data.category || 'General');
                setDueDate(data.due_date ? new Date(data.due_date).toISOString().slice(0, 16) : '');
                setCompleted(data.completed);

                // Fetch stats
                const statsData = await fetchDashboardStats(token);
                setStats(statsData);
            } catch (error) {
                console.error('Error fetching todo:', error);
                showToast('Failed to load task', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (todoId) {
            fetchTodo();
        }
    }, [todoId]);

    const showToast = (message: string, type: ToastType) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            showToast('Title is required', 'error');
            return;
        }

        setSaving(true);
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                showToast('Please login to update tasks', 'error');
                return;
            }

            const updateData: any = {
                title: title.trim(),
                description: description.trim() || null,
                priority,
                category,
                completed,
            };

            if (dueDate) {
                updateData.due_date = new Date(dueDate).toISOString();
            }

            await updateTodo(todoId, updateData, token);
            showToast('Task updated successfully!', 'success');

            // Navigate back to dashboard after a short delay
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } catch (error) {
            console.error('Error updating todo:', error);
            showToast('Failed to update task', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                showToast('Please login to delete tasks', 'error');
                return;
            }

            await deleteTodo(todoId, token);
            showToast('Task deleted successfully!', 'success');

            // Navigate back to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } catch (error) {
            console.error('Error deleting todo:', error);
            showToast('Failed to delete task', 'error');
            setIsDeleting(false);
        }
    };

    return (
        <DashboardLayout stats={stats} showAddButton={false}>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Delete Task"
                message="Are you sure you want to delete this task? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                isLoading={isDeleting}
            />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Edit Task</h1>
                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <p className="text-gray-400 mt-4">Loading task...</p>
                    </div>
                ) : !todo ? (
                    <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
                        <p className="text-gray-400 mb-4">Task not found</p>
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="text-blue-400 hover:text-blue-300"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter task title"
                                maxLength={200}
                                required
                            />
                            <p className="text-gray-500 text-sm mt-1">{title.length}/200 characters</p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                                placeholder="Enter task description (optional)"
                                maxLength={2000}
                            />
                            <p className="text-gray-500 text-sm mt-1">{description.length}/2000 characters</p>
                        </div>

                        {/* Priority and Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="General">General</option>
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Health">Health</option>
                                    <option value="Finance">Finance</option>
                                </select>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                            <input
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Completed Status */}
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id="completed"
                                checked={completed}
                                onChange={(e) => setCompleted(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor="completed" className="text-gray-300 font-medium">
                                Mark as completed
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                            <button
                                type="button"
                                onClick={() => setIsDeleteDialogOpen(true)}
                                className="flex items-center space-x-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 py-2 px-6 rounded-lg transition-colors border border-red-500/50"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete Task</span>
                            </button>

                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </DashboardLayout>
    );
}
