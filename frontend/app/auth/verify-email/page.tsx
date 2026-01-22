'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('user@example.com'); // This would come from context or params
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const router = useRouter();

  const handleResendEmail = async () => {
    setLoading(true);

    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock resend - replace with actual logic
      setResent(true);

      // Reset the resent status after 5 seconds
      setTimeout(() => setResent(false), 5000);
    } catch (err) {
      console.error('Failed to resend email');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    router.push('/auth/signin');
  };

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
            <div className="flex justify-center mb-4">
              <Mail className="w-12 h-12 text-blue-400" />
            </div>
            <h1 className="text-2xl font-semibold text-white">Verify Your Email</h1>
            <p className="text-gray-400 mt-2">We've sent a verification link to</p>
            <p className="text-gray-300 font-medium mt-1">{email}</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 p-4 rounded-lg mb-6">
            <p className="text-center">
              Please check your inbox and click the verification link to activate your account.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={loading}
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Resending...
                </>
              ) : (
                'Resend Verification Email'
              )}
            </button>

            {resent && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verification email sent!
                </div>
              </div>
            )}

            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-transparent transition-all duration-200"
            >
              Continue to Sign In
            </button>
          </div>

          {/* Back to sign in link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already verified?{' '}
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