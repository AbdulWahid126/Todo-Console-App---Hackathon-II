'use client';

import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {children}
    </div>
  );
};

export default DashboardLayout;