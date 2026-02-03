'use client';

import React from 'react';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield, Globe, Award } from 'lucide-react';

const values = [
    {
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        title: 'Speed & Efficiency',
        description: 'We believe productivity shouldn\'t be a chore. Our tools are built for lighting-fast performance.'
    },
    {
        icon: <Users className="w-8 h-8 text-blue-400" />,
        title: 'User-Centric',
        description: 'Every feature we build starts with a simple question: How does this help our users achieve more?'
    },
    {
        icon: <Shield className="w-8 h-8 text-green-400" />,
        title: 'Privacy First',
        description: 'Your data is yours. We use industry-leading encryption to ensure your tasks stay private.'
    }
];

const stats = [
    { label: 'Active Users', value: '500K+' },
    { label: 'Tasks Completed', value: '10M+' },
    { label: 'Countries', value: '120+' },
    { label: 'Team Members', value: '45' }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            <Header />

            <main className="pt-32 pb-20 overflow-hidden">
                {/* Story Section */}
                <section className="px-4 mb-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-blue-400 font-semibold mb-4 block">OUR STORY</span>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                        Revolutionizing how the world <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">manages time</span>
                                    </h1>
                                    <p className="text-gray-400 text-lg mb-6">
                                        Founded in 2024, TodoApp started with a simple observation: most task managers are cluttery and uninspiring. We wanted to build something that feels as good as it works.
                                    </p>
                                    <p className="text-gray-400 text-lg mb-8">
                                        Our team of designers and engineers are obsessed with the intersection of aesthetics and utility. We believe that when your tools look beautiful, you're more likely to use them.
                                    </p>
                                </motion.div>
                            </div>

                            <div className="lg:w-1/2 relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="relative z-10 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 p-8"
                                >
                                    <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                                        <div className="text-center">
                                            <Target className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
                                            <span className="text-xl font-bold">Focus on what matters</span>
                                        </div>
                                    </div>
                                </motion.div>
                                {/* Decorative background glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[120px] rounded-full -z-1" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision/Values Section */}
                <section className="bg-gray-900/30 py-24 px-4 border-y border-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                                The principles that guide everything we do, from engineering to customer support.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 rounded-2xl bg-gray-800/40 border border-gray-700 hover:border-blue-500/50 transition-colors"
                                >
                                    <div className="mb-6">{value.icon}</div>
                                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                    <p className="text-gray-400">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-24 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-blue-400 font-medium uppercase tracking-wider text-sm">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team/Join Section */}
                <section className="px-4 py-24">
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Join the Mission?</h2>
                            <p className="text-blue-100 text-lg mb-8">
                                We're always looking for talented designers, engineers, and product people who share our passion for beautiful tools.
                            </p>
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                                View Open Positions
                            </button>
                        </div>
                        {/* Animated background decoration */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-black/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
