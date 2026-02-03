'use client';

import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Mail, Lock, Bell, Palette, Trash2, Save } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { ToastContainer, ToastType } from '@/components/Toast';
import { User as UserType, DashboardStats } from '@/lib/types';
import { getUserProfile, fetchDashboardStats } from '@/lib/api';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export default function SettingsPage() {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Form states
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
    const [pushNotifications, setPushNotifications] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    window.location.href = '/auth/signin';
                    return;
                }

                const [userProfile, statsData] = await Promise.all([
                    getUserProfile(token),
                    fetchDashboardStats(token)
                ]);

                if (userProfile) {
                    setCurrentUser(userProfile);
                    setName(userProfile.name || '');
                    setEmail(userProfile.email || '');
                }
                setStats(statsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                showToast('Failed to load settings', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const showToast = (message: string, type: ToastType) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Profile settings saved!', 'success');
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        if (newPassword.length < 8) {
            showToast('Password must be at least 8 characters', 'error');
            return;
        }

        showToast('Password changed successfully!', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleDeleteAccount = () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            showToast('Account deletion requested. Please contact support.', 'warning');
        }
    };

    return (
        <DashboardLayout stats={stats} showAddButton={false}>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center">
                        <SettingsIcon className="w-8 h-8 mr-3 text-gray-400" />
                        Settings
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your account settings and preferences</p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <p className="text-gray-400 mt-4">Loading settings...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Settings */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Profile Settings */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-blue-500" />
                                    Profile Information
                                </h2>
                                <form onSubmit={handleSaveProfile} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Save Changes</span>
                                    </button>
                                </form>
                            </div>

                            {/* Change Password */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <Lock className="w-5 h-5 mr-2 text-yellow-500" />
                                    Change Password
                                </h2>
                                <form onSubmit={handleChangePassword} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg transition-colors"
                                    >
                                        <Lock className="w-4 h-4" />
                                        <span>Update Password</span>
                                    </button>
                                </form>
                            </div>

                            {/* Notifications */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <Bell className="w-5 h-5 mr-2 text-purple-500" />
                                    Notifications
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white font-medium">Email Notifications</p>
                                            <p className="text-gray-400 text-sm">Receive task reminders via email</p>
                                        </div>
                                        <button
                                            onClick={() => setEmailNotifications(!emailNotifications)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? 'bg-blue-600' : 'bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white font-medium">Push Notifications</p>
                                            <p className="text-gray-400 text-sm">Receive browser notifications</p>
                                        </div>
                                        <button
                                            onClick={() => setPushNotifications(!pushNotifications)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pushNotifications ? 'bg-blue-600' : 'bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pushNotifications ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                                <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
                                    <Trash2 className="w-5 h-5 mr-2" />
                                    Danger Zone
                                </h2>
                                <p className="text-gray-300 mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete Account</span>
                                </button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Account Summary */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Account Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Total Tasks</span>
                                        <span className="text-white font-semibold">{stats?.total_tasks || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Completed</span>
                                        <span className="text-green-400 font-semibold">{stats?.completed || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">In Progress</span>
                                        <span className="text-yellow-400 font-semibold">{stats?.in_progress || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Member Since</span>
                                        <span className="text-white font-semibold">
                                            {currentUser?.created_at ? new Date(currentUser.created_at).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => window.location.href = '/dashboard'}
                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors"
                                    >
                                        Go to Dashboard
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/todos'}
                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors"
                                    >
                                        View All Tasks
                                    </button>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('access_token');
                                            window.location.href = '/auth/signin';
                                        }}
                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-700/30 text-red-400 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
