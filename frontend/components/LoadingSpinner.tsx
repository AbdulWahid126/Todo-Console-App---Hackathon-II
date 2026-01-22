/**
 * LoadingSpinner component for the Todo Application
 * Task: P2-T-049, P2-T-071
 * From: specs/phase-ii/plan
 * Implements loading state UI as required by constitution VII. Clean Architecture & Stateless Services
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default function LoadingSpinner({ size = 'md', label = 'Loading...' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const borderSizeClasses = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full ${borderSizeClasses[size]} border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
      {label && <span className="mt-2 text-sm text-gray-600">{label}</span>}
    </div>
  );
}