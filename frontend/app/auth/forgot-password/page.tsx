'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { requestPasswordReset } from '../../../lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await requestPasswordReset(email);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || 'Failed to send reset email. Please try again');
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e1a] to-[#1a1f2e] p-4">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 rounded-2xl backdrop-blur-lg border border-[rgba(255,255,255,0.1)] shadow-xl">
            {/* Logo/App name */}
            <div className="text-center mb-8">
              <div className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  TodoApp
                </span>
              </div>
              <h1 className="text-2xl font-semibold text-white">Check your email</h1>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-lg mb-6">
              <p>If an account exists for {email}, you will receive a password reset link shortly.</p>
            </div>

            <div className="text-center">
              <button
                onClick={() => router.push('/auth/signin')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-transparent transition-all duration-200"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e1a] to-[#1a1f2e] p-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-2xl backdrop-blur-lg border border-[rgba(255,255,255,0.1)] shadow-xl">
          {/* Logo/App name */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                TodoApp
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-white">Reset Password</h1>
            <p className="text-gray-400 mt-2">Enter your email to receive a reset link</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Forgot password form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Sending Reset Link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </div>
          </form>

          {/* Back to sign in link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Remember your password?{' '}
              <Link href="/auth/signin" className="font-medium text-blue-400 hover:text-blue-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}