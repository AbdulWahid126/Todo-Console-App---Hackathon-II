'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Documentation', href: '#' }
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' }
  ],
  resources: [
    { label: 'Help Center', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Events', href: '#' },
    { label: 'Partners', href: '#' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Security', href: '#' }
  ]
};

const Footer = () => {
  return (
    <footer className="bg-[#050810] border-t border-[rgba(255,255,255,0.1)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                TodoApp
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              The modern way to manage tasks with stunning 3D visuals and smooth animations.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(255,255,255,0.1)] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TodoApp. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm mx-4 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;