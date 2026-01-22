/**
 * Root layout for the Todo Application
 * Task: P2-T-014
 * From: specs/phase-ii/plan
 * Implements responsive design layout as required by constitution VII. Clean Architecture & Stateless Services
 */

import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todo App - Phase II',
  description: 'Full-Stack Web Todo Application with Next.js and FastAPI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-[#0a0e1a]">
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}