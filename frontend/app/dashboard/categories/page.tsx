'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import TaskCard from '@/components/TaskCard';
import TaskModal, { TaskFormData } from '@/components/TaskModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import { ToastContainer, ToastType } from '@/components/Toast';
import { TaskSummary, DashboardStats } from '@/lib/types';
import { createTodo, updateTodo, deleteTodo, fetchDashboardStats, fetchTodosByCategory } from '@/lib/api';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export default function CategoriesPage() {
    const [tasks, setTasks] = useState<Record<string, TaskSummary[]>>({});
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    const fetchTasksByCategory = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                window.location.href = '/auth/signin';
                return;
            }

            const data = await fetchTodosByCategory(token);
            setTasks(data);

            const statsData = await fetchDashboardStats(token);
            setStats(statsData);
        } catch (error) {
            console.error('Error fetching tasks by category:', error);
            showToast('Failed to load tasks', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasksByCategory();
    }, []);

    const showToast = (message: string, type: ToastType) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const handleCreateTask = async (taskData: TaskFormData) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                showToast('Please login to create tasks', 'error');
                return;
            }

            const todoData: any = {
                title: taskData.title,
                description: taskData.description || null,
            };

            if (taskData.due_date) {
                todoData.due_date = new Date(taskData.due_date).toISOString();
            }
            if (taskData.priority) {
                todoData.priority = taskData.priority;
            }
            if (taskData.category) {
                todoData.category = taskData.category;
            }

            await createTodo(todoData, token);
            showToast('Task created successfully!', 'success');
            await fetchTasksByCategory();
            setIsTaskModalOpen(false);
        } catch (error) {
            console.error('Error creating task:', error);
            showToast('Failed to create task', 'error');
            throw error;
        }
    };

    const handleEditTask = (taskId: string) => {
        window.location.href = `/todos/${taskId}`;
    };

    const handleDeleteClick = (taskId: string) => {
        setTaskToDelete(taskId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return;

        setIsDeleting(true);
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                showToast('Please login to delete tasks', 'error');
                return;
            }

            await deleteTodo(taskToDelete, token);
            showToast('Task deleted successfully!', 'success');
            await fetchTasksByCategory();
            setIsDeleteDialogOpen(false);
            setTaskToDelete(null);
        } catch (error) {
            console.error('Error deleting task:', error);
            showToast('Failed to delete task', 'error');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleToggleComplete = async (taskId: string, currentStatus: boolean) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                showToast('Please login to update tasks', 'error');
                return;
            }

            await updateTodo(taskId, { completed: !currentStatus }, token);
            showToast(`Task marked as ${!currentStatus ? 'completed' : 'incomplete'}!`, 'success');
            await fetchTasksByCategory();
        } catch (error) {
            console.error('Error updating task:', error);
            showToast('Failed to update task', 'error');
        }
    };

    // Use tasks directly since they are already grouped from the backend
    const groupedTasks = tasks;

    const categoryColors: Record<string, string> = {
        'Work': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
        'Personal': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
        'Shopping': 'bg-green-500/20 text-green-400 border-green-500/50',
        'Health': 'bg-red-500/20 text-red-400 border-red-500/50',
        'Finance': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
        'General': 'bg-gray-500/20 text-gray-400 border-gray-500/50',
        'Uncategorized': 'bg-gray-500/20 text-gray-400 border-gray-500/50',
    };

    return (
        <DashboardLayout
            stats={stats}
            onAddTask={() => setIsTaskModalOpen(true)}
            showAddButton={true}
        >
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                onSubmit={handleCreateTask}
                mode="create"
            />

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setTaskToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Delete Task"
                message="Are you sure you want to delete this task? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                isLoading={isDeleting}
            />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center">
                            <Tag className="w-8 h-8 mr-3 text-orange-500" />
                            Categories
                        </h1>
                        <p className="text-gray-400 mt-2">Tasks organized by category</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        <p className="text-gray-400 mt-4">Loading categories...</p>
                    </div>
                ) : Object.keys(groupedTasks).length === 0 ? (
                    <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
                        <Tag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks yet</h3>
                        <p className="text-gray-500 mb-6">Create tasks and organize them by category.</p>
                        <button
                            onClick={() => setIsTaskModalOpen(true)}
                            className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-lg transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Task</span>
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {Object.entries(groupedTasks).map(([category, categoryTasks]) => {
                            const isExpanded = expandedCategories.has(category);
                            const categoryColor = categoryColors[category] || categoryColors['General'];

                            return (
                                <div key={category} className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className="w-full p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            {isExpanded ? (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            )}
                                            <Tag className="w-5 h-5 text-orange-500" />
                                            <span className="text-lg font-semibold text-white">{category}</span>
                                            <span className={`px-3 py-1 rounded-full text-sm border ${categoryColor}`}>
                                                {categoryTasks.length} task{categoryTasks.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {categoryTasks.filter(t => !t.completed).length} active • {categoryTasks.filter(t => t.completed).length} completed
                                        </div>
                                    </button>

                                    {isExpanded && (
                                        <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                            {categoryTasks.map((task) => (
                                                <TaskCard
                                                    key={task.id}
                                                    task={task}
                                                    onEdit={handleEditTask}
                                                    onDelete={handleDeleteClick}
                                                    onToggleComplete={handleToggleComplete}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
