'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  CalendarClock,
  CheckCircle,
  Tag,
  Settings,
  User,
  Bell,
  Plus,
  Search,
  Menu,
  X as XIcon,
  Pencil,
  Trash2
} from 'lucide-react';
import {
  fetchDashboardStats,
  fetchRecentTasks,
  getUserProfile,
  createTodo,
  updateTodo,
  deleteTodo
} from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import { DashboardStats, TaskSummary, User as UserType } from '@/lib/types';
import TaskModal, { TaskFormData } from '@/components/TaskModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import { ToastContainer, ToastType } from '@/components/Toast';
import { ProgressBar, SimplePieChart, SimpleBarChart } from '@/components/Charts';

// Define TypeScript interfaces
interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color: string;
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard' },
  { label: 'All Tasks', icon: <ListTodo className="w-5 h-5" />, href: '/todos' },
  { label: 'Today', icon: <Calendar className="w-5 h-5" />, href: '/dashboard/today' },
  { label: 'Upcoming', icon: <CalendarClock className="w-5 h-5" />, href: '/dashboard/upcoming' },
  { label: 'Completed', icon: <CheckCircle className="w-5 h-5" />, href: '/dashboard/completed' },
  { label: 'Categories', icon: <Tag className="w-5 h-5" />, href: '/dashboard/categories' },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/settings' },
];

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskSummary[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Fetch dashboard data
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token');

      if (!token) {
        window.location.href = '/auth/signin';
        return;
      }

      const userProfile = await getUserProfile(token);
      if (userProfile) {
        setCurrentUser(userProfile);
      }

      const [statsData, tasksData] = await Promise.all([
        fetchDashboardStats(token),
        fetchRecentTasks(token)
      ]);

      setStats(statsData);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleAddTask = () => {
    setIsTaskModalOpen(true);
  };

  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        showToast('Please login to create tasks', 'error');
        return;
      }

      // Prepare task data for API
      const todoData: any = {
        title: taskData.title,
        description: taskData.description || null,
      };

      // Add optional fields if provided
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

      // Refresh dashboard data
      await fetchData();
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
      showToast('Failed to create task', 'error');
      throw error; // Re-throw to keep modal open
    }
  };

  const handleEditTask = (taskId: string) => {
    // Navigate to edit page
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

      // Refresh dashboard data
      await fetchData();
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
    // Optimistic update
    const newStatus = !currentStatus;
    setTasks(prevTasks =>
      prevTasks.map(t => t.id === taskId ? { ...t, completed: newStatus } : t)
    );

    // Update stats optimistically too
    if (stats) {
      setStats({
        ...stats,
        completed: newStatus ? stats.completed + 1 : stats.completed - 1,
        in_progress: newStatus ? stats.in_progress - 1 : stats.in_progress + 1
      });
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        showToast('Please login to update tasks', 'error');
        return;
      }

      await updateTodo(taskId, { completed: newStatus }, token);
      showToast(`Task marked as ${newStatus ? 'completed' : 'incomplete'}!`, 'success');
    } catch (error) {
      console.error('Error updating task:', error);
      showToast('Failed to update task', 'error');
      // Rollback on error
      await fetchData();
    }
  };

  // Prepare stats cards based on fetched data
  const statsCards: StatCard[] = stats ? [
    {
      title: 'Total Tasks',
      value: stats.total_tasks,
      icon: <ListTodo className="w-6 h-6" />,
      trend: { value: Math.floor(Math.random() * 20), direction: 'up' },
      color: '#3b82f6'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6" />,
      trend: { value: Math.floor(Math.random() * 15), direction: 'up' },
      color: '#10b981'
    },
    {
      title: 'In Progress',
      value: stats.in_progress,
      icon: <Calendar className="w-6 h-6" />,
      color: '#f59e0b'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: <XIcon className="w-6 h-6" />,
      trend: { value: Math.floor(Math.random() * 5), direction: 'down' },
      color: '#ef4444'
    }
  ] : [];

  return (
    <DashboardLayout
      stats={stats}
      onAddTask={handleAddTask}
      showAddButton={true}
    >
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Task Creation Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateTask}
        mode="create"
      />

      {/* Delete Confirmation Dialog */}
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

      <div className="py-2">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Good morning, {currentUser?.name || 'there'}! Here's what's happening today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <div style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              {stat.trend && (
                <div className={`flex items-center mt-4 text-sm ${stat.trend.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  <span>{stat.trend.direction === 'up' ? '↑' : '↓'} {stat.trend.value}%</span>
                  <span className="ml-1">from last week</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Task List Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Tasks</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Filter
              </button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Sort
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-x-auto shadow-xl">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="mb-4">No tasks found</p>
                <button
                  onClick={handleAddTask}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Your First Task</span>
                </button>
              </div>
            ) : (
              <table className="w-full min-w-[700px]">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-normal">Task</th>
                    <th className="text-left p-4 text-gray-400 font-normal">Priority</th>
                    <th className="text-left p-4 text-gray-400 font-normal">Category</th>
                    <th className="text-left p-4 text-gray-400 font-normal">Status</th>
                    <th className="text-left p-4 text-gray-400 font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/30">
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{task.title}</p>
                          {task.description && (
                            <p className="text-gray-400 text-sm mt-1 line-clamp-1">{task.description}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs capitalize ${task.priority === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : task.priority === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-blue-500/20 text-blue-400'
                            }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-300 text-sm">{task.category}</span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleComplete(task.id, task.completed)}
                          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${task.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-600 hover:border-blue-500 text-transparent'
                            }`}
                          title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                        >
                          <CheckCircle className={`w-5 h-5 ${task.completed ? 'block' : 'group-hover:text-blue-500/50'}`} />
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTask(task.id)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors"
                            title="Edit task"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(task.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                            title="Delete task"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Charts Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Status Distribution */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4">Task Status Overview</h3>
              {stats ? (
                <div className="space-y-4">
                  <ProgressBar
                    label="Completed"
                    value={stats.completed}
                    total={stats.total_tasks}
                    color="#10b981"
                  />
                  <ProgressBar
                    label="In Progress"
                    value={stats.in_progress}
                    total={stats.total_tasks}
                    color="#f59e0b"
                  />
                  <ProgressBar
                    label="Overdue"
                    value={stats.overdue}
                    total={stats.total_tasks}
                    color="#ef4444"
                  />
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Completion Rate</span>
                      <span className="text-2xl font-bold text-green-400">
                        {stats.total_tasks > 0
                          ? Math.round((stats.completed / stats.total_tasks) * 100)
                          : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Loading analytics...
                </div>
              )}
            </div>

            {/* Tasks by Category */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4">Tasks by Category</h3>
              {stats && tasks.length > 0 ? (
                <SimplePieChart
                  data={(() => {
                    // Group tasks by category
                    const categoryCount: Record<string, number> = {};
                    tasks.forEach(task => {
                      const cat = task.category || 'General';
                      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
                    });

                    // Define colors for categories
                    const categoryColors: Record<string, string> = {
                      'Work': '#3b82f6',
                      'Personal': '#8b5cf6',
                      'Shopping': '#10b981',
                      'Health': '#ef4444',
                      'Finance': '#f59e0b',
                      'General': '#6b7280',
                    };

                    return Object.entries(categoryCount).map(([label, value]) => ({
                      label,
                      value,
                      color: categoryColors[label] || '#6b7280',
                    }));
                  })()}
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  {tasks.length === 0 ? 'No tasks to analyze' : 'Loading analytics...'}
                </div>
              )}
            </div>

            {/* Priority Distribution */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4">Tasks by Priority</h3>
              {tasks.length > 0 ? (
                <SimpleBarChart
                  data={(() => {
                    const priorityCount = {
                      high: tasks.filter(t => t.priority === 'high').length,
                      medium: tasks.filter(t => t.priority === 'medium').length,
                      low: tasks.filter(t => t.priority === 'low').length,
                    };
                    return [
                      { label: 'High', value: priorityCount.high },
                      { label: 'Medium', value: priorityCount.medium },
                      { label: 'Low', value: priorityCount.low },
                    ];
                  })()}
                  color="#3b82f6"
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  No tasks to analyze
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Tasks Completed Today</span>
                  </div>
                  <span className="text-white font-semibold">
                    {tasks.filter(t => t.completed && t.updated_at &&
                      new Date(t.updated_at).toDateString() === new Date().toDateString()
                    ).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Tasks Created This Week</span>
                  </div>
                  <span className="text-white font-semibold">
                    {tasks.filter(t => {
                      if (!t.created_at) return false;
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(t.created_at) >= weekAgo;
                    }).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">Active Tasks</span>
                  </div>
                  <span className="text-white font-semibold">
                    {tasks.filter(t => !t.completed).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-300">Overdue Tasks</span>
                  </div>
                  <span className="text-white font-semibold">{stats?.overdue || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;