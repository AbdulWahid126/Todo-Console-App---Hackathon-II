'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Stat {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

const stats: Stat[] = [
  { value: "10K+", label: "Active Users", description: "Growing daily" },
  { value: "50K+", label: "Tasks Completed", description: "Every month" },
  { value: "99.9%", label: "Uptime", description: "Reliable service" },
  { value: "24/7", label: "Support", description: "Always available" }
];

const StatCard = ({ value, label, description }: Stat) => {
  const [count, setCount] = useState(0);
  const numericValue = value.replace(/[^\d.]/g, '');
  const isPercentage = value.includes('%');
  const isTime = value === '24/7';

  useEffect(() => {
    if (isTime || isPercentage) {
      setCount(parseFloat(numericValue));
      return;
    }

    let start = 0;
    const end = parseFloat(numericValue);
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericValue, isPercentage, isTime]);

  const displayValue = isTime
    ? value
    : isPercentage
    ? `${Math.floor(count)}%`
    : `${Math.floor(count)}${value.match(/K\+$/) ? 'K+' : ''}`;

  return (
    <motion.div
      className="text-center p-6"
      whileHover={{ scale: 1.1, y: -5 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {displayValue}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{label}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0f1419] to-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;