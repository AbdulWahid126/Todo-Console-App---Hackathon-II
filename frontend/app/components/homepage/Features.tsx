'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Easy Task Management",
    description: "Create, organize, and track tasks effortlessly",
    gradientClass: "bg-gradient-to-r from-blue-500 to-cyan-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Blazing fast performance with optimized algorithms",
    gradientClass: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure & Private",
    description: "End-to-end encryption for your peace of mind",
    gradientClass: "bg-gradient-to-r from-green-500 to-emerald-500"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Cross Platform",
    description: "Access your tasks anywhere, anytime",
    gradientClass: "bg-gradient-to-r from-orange-500 to-red-500"
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Smart Reminders",
    description: "Intelligent notifications to keep you on track",
    gradientClass: "bg-gradient-to-r from-indigo-500 to-blue-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Team Collaboration",
    description: "Work together seamlessly with your team",
    gradientClass: "bg-gradient-to-r from-teal-500 to-cyan-500"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-[#0a0e1a] to-[#0f1419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to boost your productivity and manage your tasks effectively
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`glass-card p-8 rounded-2xl backdrop-blur-lg border border-[rgba(255,255,255,0.1)] hover:transform hover:-translate-y-2 transition-all duration-300`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.gradientClass} flex items-center justify-center mb-6 mx-auto`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;