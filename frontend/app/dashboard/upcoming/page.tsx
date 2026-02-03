'use client';

import React, { useState, useEffect } from 'react';
import { CalendarClock, Plus } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import TaskCard from '@/components/TaskCard';
import TaskModal, { TaskFormData } from '@/components/TaskModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import { ToastContainer, ToastType } from '@/components/Toast';
import { TaskSummary, DashboardStats } from '@/lib/types';
import { createTodo, updateTodo, deleteTodo, fetchDashboardStats } from '@/lib/api';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export default function UpcomingPage() {
    const [tasks, setTasks] = useState<TaskSummary[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    const fetchUpcomingTasks = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                window.location.href = '/auth/signin';
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1'}/todos/upcoming`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch upcoming tasks');
            }

            const data = await response.json();
            setTasks(data);

            const statsData = await fetchDashboardStats(token);
            setStats(statsData);
        } catch (error) {
            console.error('Error fetching upcoming tasks:', error);
            showToast('Failed to load tasks', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUpcomingTasks();
    }, []);

    const showToast = (message: string, type: ToastType) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
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
            await fetchUpcomingTasks();
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
            await fetchUpcomingTasks();
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
            await fetchUpcomingTasks();
        } catch (error) {
            console.error('Error updating task:', error);
            showToast('Failed to update task', 'error');
        }
    };

    // Group tasks by date
    const groupedTasks = tasks.reduce((acc, task) => {
        if (!task.due_date) return acc;

        const date = new Date(task.due_date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(task);
        return acc;
    }, {} as Record<string, TaskSummary[]>);

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
                            <CalendarClock className="w-8 h-8 mr-3 text-purple-500" />
                            Upcoming Tasks
                        </h1>
                        <p className="text-gray-400 mt-2">Tasks scheduled for the future</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                        <p className="text-gray-400 mt-4">Loading upcoming tasks...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
                        <CalendarClock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No upcoming tasks</h3>
                        <p className="text-gray-500 mb-6">Schedule tasks for the future to stay organized.</p>
                        <button
                            onClick={() => setIsTaskModalOpen(true)}
                            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Upcoming Task</span>
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedTasks).map(([date, dateTasks]) => (
                            <div key={date}>
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm mr-3">
                                        {dateTasks.length}
                                    </span>
                                    {date}
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {dateTasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onEdit={handleEditTask}
                                            onDelete={handleDeleteClick}
                                            onToggleComplete={handleToggleComplete}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && tasks.length > 0 && (
                    <div className="text-center text-gray-400 text-sm">
                        {tasks.filter(t => !t.completed).length} active • {tasks.filter(t => t.completed).length} completed
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
