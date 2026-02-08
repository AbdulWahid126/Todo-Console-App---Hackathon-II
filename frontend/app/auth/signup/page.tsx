'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { register, checkEmailAvailability } from '../../../lib/api';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface PasswordStrength {
  score: number;
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [emailChecking, setEmailChecking] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);
  const router = useRouter();

  // Calculate password strength
  useEffect(() => {
    if (formData.password) {
      const strength = calculatePasswordStrength(formData.password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(null);
    }
  }, [formData.password]);

  // Check email availability
  useEffect(() => {
    if (formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      const timer = setTimeout(async () => {
        setEmailChecking(true);
        try {
          const isAvailable = await checkEmailAvailability(formData.email);
          setEmailAvailable(isAvailable);
        } catch (error) {
          // If there's an error checking availability, we'll treat it as available to not block registration
          setEmailAvailable(true);
        } finally {
          setEmailChecking(false);
        }
      }, 300); // Debounce for 300ms

      return () => clearTimeout(timer);
    } else {
      setEmailAvailable(null);
    }
  }, [formData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const labels: ('Weak' | 'Fair' | 'Good' | 'Strong')[] = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#ef4444', '#ef4444', '#f59e0b', '#06b6d4', '#10b981'];

    return {
      score: Math.min(score, 4),
      label: labels[score],
      color: colors[score]
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Skip email availability check if still checking or if the check failed
    if (emailAvailable === false && !emailChecking) {
      setError('This email is already registered. Try signing in?');
      setLoading(false);
      return;
    }

    try {
      const result = await register({
        email: formData.email,
        name: formData.name,
        password: formData.password
      });

      if (result.token) {
        // Store the token in localStorage
        localStorage.setItem('access_token', result.token);

        // Show success message
        setSuccess('Account created successfully.');

        // Successful registration - redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setError(result.message || 'Unable to create account. Please try again');
      }
    } catch (err: any) {
      setError(err.message || 'Connection failed. Please try again');
    } finally {
      if (!success) {
        setLoading(false);
      }
    }
  };

  // Validation checks for enabling submit button
  const isFormValid =
    formData.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword &&
    formData.agreeToTerms;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e1a] to-[#1a1f2e] p-4">
      <div className="w-full max-w-lg">
        <div className="glass-card p-8 rounded-2xl backdrop-blur-lg border border-[rgba(255,255,255,0.1)] shadow-xl">
          {/* Logo/App name */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                TodoZz
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-white">Create Account</h1>
            <p className="text-gray-400 mt-2">Join us today to get started</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          {/* Sign-up form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border ${formData.name.trim().length >= 2
                  ? 'border-green-500/30'
                  : formData.name && formData.name.trim().length < 2
                    ? 'border-red-500/30'
                    : 'border-[rgba(255,255,255,0.1)]'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="John Doe"
              />
              {formData.name && formData.name.trim().length < 2 && (
                <p className="mt-2 text-sm text-red-400">Name must be at least 2 characters</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border ${emailChecking
                    ? 'border-blue-500/30'
                    : emailAvailable === true
                      ? 'border-green-500/30'
                      : emailAvailable === false
                        ? 'border-red-500/30'
                        : 'border-[rgba(255,255,255,0.1)]'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10`}
                  placeholder="your@email.com"
                />
                {emailChecking && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                  </div>
                )}
                {emailAvailable === true && !emailChecking && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500">
                    <Check size={20} />
                  </div>
                )}
                {emailAvailable === false && !emailChecking && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500">
                    <AlertCircle size={20} />
                  </div>
                )}
              </div>
              {emailAvailable === false && !emailChecking && (
                <p className="mt-2 text-sm text-red-400">This email is already registered</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border ${passwordStrength?.score && passwordStrength.score >= 3
                    ? 'border-green-500/30'
                    : formData.password
                      ? 'border-yellow-500/30'
                      : 'border-[rgba(255,255,255,0.1)]'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password strength indicator */}
              {formData.password && passwordStrength && (
                <div className="mt-2">
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${(passwordStrength.score / 4) * 100}%`,
                        backgroundColor: passwordStrength.color
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {passwordStrength.score}/4 strength
                    </span>
                  </div>
                </div>
              )}

              {/* Password requirements */}
              <ul className="mt-2 space-y-1 text-xs text-gray-400">
                <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-400' : ''}`}>
                  {formData.password.length >= 8 ? <Check size={12} className="mr-1" /> : <span className="mr-1">•</span>}
                  At least 8 characters
                </li>
                <li className={`flex items-center ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-green-400' : ''}`}>
                  {/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? <Check size={12} className="mr-1" /> : <span className="mr-1">•</span>}
                  Upper & lowercase letters
                </li>
                <li className={`flex items-center ${/\d/.test(formData.password) ? 'text-green-400' : ''}`}>
                  {/\d/.test(formData.password) ? <Check size={12} className="mr-1" /> : <span className="mr-1">•</span>}
                  At least 1 number
                </li>
                <li className={`flex items-center ${/[^a-zA-Z0-9]/.test(formData.password) ? 'text-green-400' : ''}`}>
                  {/[^a-zA-Z0-9]/.test(formData.password) ? <Check size={12} className="mr-1" /> : <span className="mr-1">•</span>}
                  At least 1 special character
                </li>
              </ul>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border ${formData.confirmPassword && formData.password === formData.confirmPassword
                    ? 'border-green-500/30'
                    : formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500/30'
                      : 'border-[rgba(255,255,255,0.1)]'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)]"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0a0e1a] text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-[rgba(255,255,255,0.1)] rounded-md shadow-sm bg-[rgba(255,255,255,0.05)] text-sm font-medium text-gray-300 hover:bg-[rgba(255,255,255,0.1)]"
              >
                <span className="sr-only">Sign up with Google</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-[rgba(255,255,255,0.1)] rounded-md shadow-sm bg-[rgba(255,255,255,0.05)] text-sm font-medium text-gray-300 hover:bg-[rgba(255,255,255,0.1)]"
              >
                <span className="sr-only">Sign up with GitHub</span>
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Sign in link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
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