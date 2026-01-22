'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Simple client-side authentication check
// In a real app, this would check for a stored token
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated (in a real app, check for stored token)
    const token = localStorage.getItem('auth-token') || document.cookie.includes('auth-token');

    // For now, we'll simulate authentication status
    // In a real app, this would be replaced with actual token validation
    setIsAuthenticated(!!token);
    setChecking(false);
  }, []);

  return { isAuthenticated, checking };
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, checking } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!checking && !isAuthenticated) {
      // Redirect to sign-in page if not authenticated
      router.push('/auth/signin');
    }
  }, [isAuthenticated, checking, router]);

  // Show loading state while checking authentication
  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!isAuthenticated && !checking) {
    return null;
  }

  return <>{children}</>;
}