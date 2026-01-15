"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const productId = searchParams.get('productId');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [success, setSuccess] = useState('');

  // Check if already logged in
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
    
    if (authCookie) {
      // Already logged in, redirect to callback or home
      if (callbackUrl && callbackUrl !== '/') {
        router.push(callbackUrl);
      } else {
        router.push('/');
      }
    }
  }, [router, callbackUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock authentication
      const mockUsers = [
        { email: 'user@example.com', password: 'password123', name: 'John Doe' },
        { email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
        { email: 'test@example.com', password: 'test123', name: 'Test User' }
      ];

      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (user) {
        // Set auth cookie
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7); // 7 days expiry
        
        document.cookie = `auth=true; expires=${expiryDate.toUTCString()}; path=/`;
        document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; expires=${expiryDate.toUTCString()}; path=/`;
        
        setSuccess('Login successful! Redirecting...');
        
        // Redirect after success
        setTimeout(() => {
          if (productId) {
            // Redirect to specific product page
            router.push(`/products/${productId}`);
          } else if (callbackUrl && callbackUrl !== '/') {
            router.push(callbackUrl);
          } else {
            router.push('/');
          }
        }, 1500);
      } else {
        setError('Invalid email or password. Try: user@example.com / password123');
        setLoading(false);
      }
    }, 1000);
  };

  // Demo login for testing
  const handleDemoLogin = (type = 'user') => {
    if (type === 'user') {
      setEmail('user@example.com');
      setPassword('password123');
    } else if (type === 'admin') {
      setEmail('admin@example.com');
      setPassword('admin123');
    } else {
      setEmail('test@example.com');
      setPassword('test123');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Login Header */}
      <div className="text-center mb-8 ">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
          <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold   mb-2">
          Welcome to Tech Gear
        </h2>
        <p className=" ">
          Sign in to your account to continue
          {callbackUrl && callbackUrl !== '/' && (
            <span className="block text-sm text-blue-600 dark:text-blue-400 mt-1">
              You'll be redirected after login
            </span>
          )}
          {productId && (
            <span className="block text-sm text-green-600 dark:text-green-400 mt-1">
              Viewing product #{productId}
            </span>
          )}
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4   border border-green-200 dark:border-green-800 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
              <div className="mt-2 h-1 w-full bg-green-200 dark:bg-green-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 dark:bg-green-400 animate-progress"></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4   border border-red-200 dark:border-red-800 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium   mb-2">
            Email Address
          </label>
          <div className="relative bg-base-100   rounded-lg">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3   border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
              disabled={loading || success}
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium  ">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative bg-base-100   rounded-lg">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3   border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
              disabled={loading || success}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              disabled={loading || success}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Demo Login */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              disabled={loading || success}
            />
            <span className="text-sm  ">
              Remember me
            </span>
          </label>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              disabled={loading || success}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors disabled:opacity-50"
            >
              User Demo
            </button>
             
 
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || success}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </>
          ) : success ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Success!
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Registration Link */}
      <div className="mt-8 text-center">
        <p className=" ">
          Don't have an account?{' '}
          <Link
            href={`/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}${productId ? `&productId=${productId}` : ''}`}
            className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Demo Credentials */}
      <div className="mt-8 p-4   rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <strong>Demo Credentials:</strong>
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <div>User: user@example.com / password123</div>
           
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;