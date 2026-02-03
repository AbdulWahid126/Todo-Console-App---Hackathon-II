'use client';

import React, { useState } from 'react';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormState('success');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            <Header />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            Get in <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-xl max-w-2xl mx-auto"
                        >
                            Have a question about TodoApp? Our team is here to help you get the most out of your productivity journey.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl">
                                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Email Us</div>
                                            <div className="text-gray-400">support@todoapp.com</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400">
                                            <MessageSquare size={24} />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Live Chat</div>
                                            <div className="text-gray-400">Available Mon-Fri, 9am - 6pm EST</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-purple-500/10 p-3 rounded-lg text-purple-400">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Office</div>
                                            <div className="text-gray-400">123 Productivity Plaza, New York, NY 10001</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social or Extra Info */}
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-4">Why Contact Us?</h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        <span>Technical support and troubleshooting</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        <span>Billing and subscription inquiries</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        <span>Feature requests and feedback</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        <span>Partnership opportunities</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl relative overflow-hidden"
                        >
                            {formState === 'success' ? (
                                <div className="py-12 text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 text-green-500 rounded-full mb-6">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                                        Thank you for reaching out. A member of our team will get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setFormState('idle')}
                                        className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John"
                                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Doe"
                                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                                        <select className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                                            <option>General Inquiry</option>
                                            <option>Technical Support</option>
                                            <option>Billing Question</option>
                                            <option>Feature Request</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            placeholder="How can we help you?"
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        disabled={formState === 'submitting'}
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 disabled:opacity-50 transition-all duration-200"
                                    >
                                        {formState === 'submitting' ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
