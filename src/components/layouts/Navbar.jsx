'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import logo from '../../assets/LogoT.png'
import Image from 'next/image';
import { FaPlus, FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { FiShoppingCart, FiUser, FiSearch, FiBell } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  // Check login status on mount and theme
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Check if user is logged in from cookies
    checkLoginStatus();
  }, []);

  // Check login status from cookies
  const checkLoginStatus = () => {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
    
    if (authCookie) {
      setIsLoggedIn(true);
    }
    
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        setUserName(userData.name || userData.email.split('@')[0]);
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear all auth cookies
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    setIsLoggedIn(false);
    setUserName('');
    setIsMobileMenuOpen(false);
    
    // Redirect to home page
    router.push('/');
    router.refresh();
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Re-check login status when component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      checkLoginStatus();
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
        {/* Loading skeleton */}
        <div className="navbar-start">
          <div className="btn btn-ghost text-xl">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-20 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="navbar bg-linear-to-r from-orange-950 via-gray-800 to-teal-900 text-black dark:text-white shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center w-full">
          {/* Mobile Menu Toggle */}
          <div className="navbar-start lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="btn btn-ghost btn-circle menu-toggle"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Logo - Centered on mobile, left on desktop */}
          <div className="navbar-start lg:flex-1">
            <Link href="/" className="btn btn-ghost p-0 hover:bg-transparent mr-20">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
                  <Image 
                    src={logo} 
                    alt="Tech Gear Logo" 
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 32px, 40px"
                  />
                </div>
                <span className="font-bold text-lg md:text-xl text-blue-300 whitespace-nowrap">
                  Tech <span className="text-emerald-400">Gear</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1">
              <li>
                <Link 
                  href="/" 
                  className="font-medium hover:text-primary hover:bg-transparent transition-colors px-3 py-2 rounded-lg"
                >
                  Home
                </Link>
              </li>
              <li className="relative group">
                <details>
                  <summary className="font-medium hover:text-primary hover:bg-transparent transition-colors px-3 py-2 rounded-lg">
                    Categories  
                  </summary>
                  <ul className="p-2 bg-base-100 rounded-box shadow-xl w-48 z-[60] absolute left-0 top-full">
                    <li>
                      <Link 
                        href="/category?category=mobile" 
                        className="flex items-center gap-2 hover:bg-base-200 rounded-lg px-3 py-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        Smartphones
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category?category=laptop" 
                        className="flex items-center gap-2 hover:bg-base-200 rounded-lg px-3 py-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        Laptops
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category?category=accessories" 
                        className="flex items-center gap-2 hover:bg-base-200 rounded-lg px-3 py-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                        Accessories
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category?category=tablet" 
                        className="flex items-center gap-2 hover:bg-base-200 rounded-lg px-3 py-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        Tablets
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="font-medium hover:text-primary hover:bg-transparent transition-colors px-3 py-2 rounded-lg"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="font-medium hover:text-primary hover:bg-transparent transition-colors px-3 py-2 rounded-lg"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="font-medium hover:text-primary hover:bg-transparent transition-colors px-3 py-2 rounded-lg"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="navbar-end flex items-center gap-1 md:gap-2">
            {/* Search Button (Mobile Only) */}
            <button className="btn btn-ghost btn-circle lg:hidden" aria-label="Search">
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <FaMoon className="w-5 h-5" />
              ) : (
                <FaSun className="w-5 h-5" />
              )}
            </button>

            {/* User Menu (Desktop Only) - Show when logged in */}
            {isLoggedIn ? (
              <div className="hidden md:block dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="w-8 h-8 rounded-full bg-black border border-white  flex items-center justify-center">
                    <span className=" font-semibold text-white text-sm">
                      {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                </div>
                
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              {isLoggedIn ? (
                // Show when user is logged in
                <>
                
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-outline btn-sm md:btn-md whitespace-nowrap flex items-center gap-2"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                // Show when user is not logged in
                <>
                  <Link 
                    href="/login" 
                    className="btn btn-primary btn-outline btn-sm md:btn-md whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">Login</span>
                    <FiUser className="sm:hidden w-4 h-4" />
                  </Link>
                  
                  <Link 
                    href="/register" 
                    className="btn btn-secondary btn-sm md:btn-md whitespace-nowrap text-base-100"
                  >
                    <span className="hidden sm:inline ml-1">Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`mobile-menu lg:hidden fixed top-16 left-0 w-full bg-base-100 shadow-xl transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            {/* Search Bar (Mobile) */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <ul className="space-y-1 overflow-y-auto max-h-[60vh]">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-medium">Home</span>
                </Link>
              </li>
              
              <li className="dropdown dropdown-open">
                <details>
                  <summary className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-base-200 transition-colors cursor-pointer">
                    <span className="font-medium">Categories</span>
                    <FaChevronDown className="w-4 h-4" />
                  </summary>
                  <ul className="pl-6 mt-1 space-y-1">
                    <li>
                      <Link 
                        href="/category?category=mobile" 
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        Smartphones
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category?category=laptop" 
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        Laptops
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category?category=accessories" 
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                        Accessories
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category?category=tablet" 
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        Tablets
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              
              <li>
                <Link 
                  href="/products" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-medium">All Products</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  href="/about" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-medium">About</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  href="/contact" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-medium">Contact</span>
                </Link>
              </li>
              
              {/* Show different links based on authentication status */}
              {isLoggedIn ? (
                <>
                  <li>
                    <Link 
                      href="/profile" 
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-medium">Profile</span>
                    </Link>
                  </li>
                  
   
                  
                  <li>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error/10 transition-colors text-error w-full text-left"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      href="/login" 
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-medium">Login</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link 
                      href="/register" 
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-medium">Register</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Mobile Action Buttons */}
            <div className="mt-6 pt-4 border-t border-base-300 grid grid-cols-2 gap-2">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn btn-error btn-outline flex items-center justify-center gap-2"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                  
                  <Link 
                    href="/profile" 
                    className="btn btn-primary flex items-center justify-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FiUser className="w-4 h-4" />
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="btn btn-primary btn-outline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  
                  <Link 
                    href="/register" 
                    className="btn btn-secondary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;