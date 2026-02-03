'use client';

import React, { useState, useEffect, ReactNode } from 'react';
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
    X as XIcon
} from 'lucide-react';
import { getUserProfile } from '@/lib/api';
import { User as UserType, DashboardStats } from '@/lib/types';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
    children: ReactNode;
    stats?: DashboardStats | null;
    onAddTask?: () => void;
    showAddButton?: boolean;
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

export default function DashboardLayout({
    children,
    stats,
    onAddTask,
    showAddButton = true
}: DashboardLayoutProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchUser = async () => {
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
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUser();
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-900">
            {/* Mobile menu button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
                onClick={toggleMobileMenu}
            >
                {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 z-40 h-screen bg-gray-900 border-r border-gray-800 text-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
                style={{
                    width: '280px',
                    minWidth: '280px'
                }}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-700">
                        <h1 className="text-2xl font-bold">TodoApp</h1>
                    </div>

                    {/* User Profile */}
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium">{currentUser?.name || 'User'}</p>
                                <p className="text-sm text-gray-400">{currentUser?.email || 'user@example.com'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${pathname === item.href
                                            ? 'bg-blue-500/20 border-l-4 border-blue-500'
                                            : 'hover:bg-gray-800'
                                            }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Quick Stats */}
                    {stats && (
                        <div className="p-4 border-t border-gray-700">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-gray-800 p-2 rounded text-center">
                                    <p className="text-xs text-gray-400">Completed</p>
                                    <p className="font-bold">{stats.completed || 0}</p>
                                </div>
                                <div className="bg-gray-800 p-2 rounded text-center">
                                    <p className="text-xs text-gray-400">Pending</p>
                                    <p className="font-bold">{stats.total_tasks ? stats.total_tasks - stats.completed : 0}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sign Out */}
                    <div className="p-4">
                        <button
                            onClick={() => {
                                localStorage.removeItem('access_token');
                                window.location.href = '/auth/signin';
                            }}
                            className="w-full py-2 px-4 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 p-4 md:p-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0 ml-auto w-full md:w-auto">
                            <div className="relative flex-1 md:flex-none">
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    className="bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="relative p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                                </button>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="hidden sm:inline text-white">{currentUser?.name || 'User'}</span>
                                </div>
                                {showAddButton && onAddTask && (
                                    <button
                                        onClick={onAddTask}
                                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="hidden sm:inline">Add Task</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                {children}
            </main>

            {/* Overlay for mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={toggleMobileMenu}
                ></div>
            )}
        </div>
    );
}
