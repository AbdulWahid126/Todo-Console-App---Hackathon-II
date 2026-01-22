/**
 * Home page for the Todo Application
 * Task: P2-T-044
 * From: specs/phase-ii/plan
 * Implements home page with modern dark theme design as specified in mainpage.md
 */

import Header from './components/homepage/Header';
import HeroSection from './components/homepage/Hero';
import FeaturesSection from './components/homepage/Features';
import StatsSection from './components/homepage/Stats';
import TestimonialsSection from './components/homepage/Testimonials';
import CTASection from './components/homepage/CTA';
import Footer from './components/homepage/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />

      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}