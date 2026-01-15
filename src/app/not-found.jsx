
"use client"

import React from 'react';
import Link from 'next/link';
import { Home, RefreshCw, AlertTriangle, ArrowLeft } from 'lucide-react';

const ErrorPage = ({ statusCode = 404, message = "Page Not Found" }) => {
  const errors = {
    404: {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      emoji: "🔍",
      color: "blue"
    },
    500: {
      title: "Server Error",
      description: "Something went wrong on our end. Please try again later.",
      emoji: "⚙️",
      color: "red"
    },
    403: {
      title: "Access Denied",
      description: "You don't have permission to access this page.",
      emoji: "🔒",
      color: "yellow"
    },
    400: {
      title: "Bad Request",
      description: "Your request couldn't be processed. Please check and try again.",
      emoji: "📝",
      color: "orange"
    }
  };

  const error = errors[statusCode] || errors[404];

  return (
    <div className="min-h-screen mt-17 bg-base-100   flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Background Elements */}
        <div className="relative mb-12">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Error Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto  bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
              <div className={`text-4xl ${error.color === 'red' ? 'text-red-500' : 
                error.color === 'blue' ? 'text-red-500' : 
                error.color === 'yellow' ? 'text-yellow-500' : 
                'text-orange-500'}`}>
                {error.emoji}
              </div>
            </div>
            <AlertTriangle className={`absolute -top-2 -right-2 w-10 h-10 ${error.color === 'red' ? 'text-red-400' : 
              error.color === 'blue' ? 'text-red-400' : 
              error.color === 'yellow' ? 'text-yellow-400' : 
              'text-orange-400'}`} />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${error.color === 'red' ? 'bg-red-100 text-red-700' : 
            error.color === 'blue' ? 'bg-blue-100 text-red-700' : 
            error.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-orange-100 text-orange-700'}`}>
            Error {statusCode}
          </span>
        </div>

        {/* Error Message */}
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${error.color === 'red' ? 'text-red-600' : 
          error.color === 'blue' ? 'text-red-600' : 
          error.color === 'yellow' ? 'text-yellow-600' : 
          'text-orange-600'}`}>
          {error.title}
        </h1>
        
        <p className="text-xl   mb-10 max-w-lg mx-auto">
          {error.description}
        </p>

 

        {/* Action Buttons */}
        <div className="flex flex-col bg-base-100 sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3  text-base-100 bg-primary rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-base-100 border border-gray-300   rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-base-100 border border-gray-300   rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh Page
          </button>
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-4">
            Still need help?
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact our support team
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

   
      </div>

      <style  >{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;