'use client';

import React from 'react';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';

const tiers = [
    {
        name: 'Basic',
        price: '0',
        description: 'Perfect for individuals and personal projects.',
        features: [
            'Up to 10 active tasks',
            'Basic categories',
            'Due date reminders',
            'Mobile responsive view',
            'Email support'
        ],
        cta: 'Get Started',
        href: '/auth/signup',
        featured: false
    },
    {
        name: 'Pro',
        price: '9',
        description: 'Everything you need to stay productive.',
        features: [
            'Unlimited tasks',
            'Custom categories',
            'Advanced analytics',
            'Priority support',
            'Early access to features',
            'Offline sync'
        ],
        cta: 'Start Free Trial',
        href: '/auth/signup',
        featured: true
    },
    {
        name: 'Enterprise',
        price: '29',
        description: 'Built for teams and organizations.',
        features: [
            'Team collaboration',
            'Administrative controls',
            'Custom integrations',
            'Dedicated account manager',
            '99.9% uptime SLA',
            'SSO Authentication'
        ],
        cta: 'Contact Sales',
        href: '/contact',
        featured: false
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            <Header />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            Simple, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Transparent</span> Pricing
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-xl max-w-2xl mx-auto"
                        >
                            Choose the plan that's right for you and start organizing your life today.
                        </motion.p>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className={`relative p-8 rounded-2xl border ${tier.featured
                                        ? 'bg-gradient-to-b from-blue-900/40 to-blue-950/20 border-blue-500 shadow-2xl shadow-blue-500/20'
                                        : 'bg-gray-900/40 border-gray-800'
                                    }`}
                            >
                                {tier.featured && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                                        <Star size={14} fill="currentColor" />
                                        <span>Most Popular</span>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                    <p className="text-gray-400 text-sm mb-6">{tier.description}</p>
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-bold">${tier.price}</span>
                                        <span className="text-gray-400 ml-2">/month</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start space-x-3 text-sm text-gray-300">
                                            <div className="flex-shrink-0 mt-0.5 text-blue-400">
                                                <Check size={18} />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={tier.href}
                                    className={`block w-full py-3 rounded-xl text-center font-semibold transition-all duration-200 ${tier.featured
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90'
                                            : 'bg-gray-800 text-white hover:bg-gray-700'
                                        }`}
                                >
                                    {tier.cta}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* FAQ Preview or Trust Section */}
                    <div className="mt-24 text-center">
                        <h2 className="text-2xl font-bold mb-8">Trusted by thousands of productive individuals</h2>
                        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholders for partner logos */}
                            <div className="text-xl font-bold text-gray-400">PRODUCTIVE</div>
                            <div className="text-xl font-bold text-gray-400">ORGANIZE</div>
                            <div className="text-xl font-bold text-gray-400">FLOW</div>
                            <div className="text-xl font-bold text-gray-400">FOCUS</div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
