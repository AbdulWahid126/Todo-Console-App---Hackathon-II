'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  author: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    author: "Alex Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content: "This TODO app has transformed how our team manages tasks. The 3D interface makes it so much more engaging!",
    rating: 5
  },
  {
    author: "Sarah Williams",
    role: "Freelance Designer",
    company: "Creative Studio",
    content: "I love the smooth animations and beautiful design. It makes task management actually enjoyable.",
    rating: 5
  },
  {
    author: "Michael Chen",
    role: "Software Engineer",
    company: "StartupXYZ",
    content: "The performance is incredible, even with all the fancy 3D elements. My productivity has increased significantly.",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div
      className="glass-card p-8 rounded-2xl backdrop-blur-lg border border-[rgba(255,255,255,0.1)]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10 }}
    >
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-300 text-lg italic mb-6">"{testimonial.content}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-white">{testimonial.author}</h4>
          <p className="text-gray-400 text-sm">{testimonial.role}{testimonial.company && `, ${testimonial.company}`}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-[#0f1419] to-[#1a1f2e]">
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
              What Our Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their productivity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;