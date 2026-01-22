'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and 3D elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Ready to Transform Your Productivity?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have revolutionized their task management with our stunning 3D-powered TODO app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity duration-200 inline-flex items-center justify-center"
            >
              Get Started Now
            </Link>
            <Link
              href="/auth/signup"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 inline-flex items-center justify-center"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;