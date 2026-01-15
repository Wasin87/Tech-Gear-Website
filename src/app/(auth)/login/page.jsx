"use client";

import LoginForm from '@/components/Form/LoginForm';
import React, { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Smartphone, Laptop, Tablet, Headphones } from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const productId = searchParams.get('productId');

  // Check if already logged in
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
    
    if (authCookie) {
      // Already logged in, redirect to callback or home
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push('/');
      }
    }
  }, [router, callbackUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center mt-12  bg-base-100 px-4 py-12">
      {/* Background Tech Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <Smartphone className="absolute top-20 left-10 w-24 h-24 text-blue-500 animate-float" />
        <Laptop className="absolute top-40 right-16 w-32 h-32 text-purple-500 animate-float animation-delay-1000" />
        <Tablet className="absolute bottom-32 left-20 w-28 h-28 text-green-500 animate-float animation-delay-1500" />
        <Headphones className="absolute bottom-40 right-24 w-24 h-24 text-orange-500 animate-float animation-delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg"
      >
  

        {/* Card */}
        <div className="relative  bg-base-100 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-10 overflow-hidden">
          {/* Decorative Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 -z-10"></div>
          
          
          {/* Login Form */}
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>

        </div>

        {/* Need Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{' '}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </motion.div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Login;