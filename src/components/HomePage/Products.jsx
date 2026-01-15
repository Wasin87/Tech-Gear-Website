'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ArrowRight, Search, Filter, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import trends from '@/Data/Products';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Get unique brands and categories from data
  const brands = useMemo(() => {
    const brandSet = new Set(trends.map(item => item.brand));
    return ['All', ...Array.from(brandSet)].sort();
  }, []);

  const categories = useMemo(() => {
    const categorySet = new Set(trends.map(item => item.category));
    return ['All', ...Array.from(categorySet)].sort();
  }, []);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return trends.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Brand filter
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;

      // Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      // Price range filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedBrand, selectedCategory, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'name-asc':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products; // featured/default order
    }
  }, [filteredProducts, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Get price range extremes
  const minPrice = Math.min(...trends.map(p => p.price));
  const maxPrice = Math.max(...trends.map(p => p.price));

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('All');
    setSelectedCategory('All');
    setPriceRange([minPrice, maxPrice]);
    setSortBy('featured');
    setCurrentPage(1);
  };

  // Handle page change
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

// Format price to BDT with custom symbol
const formatPrice = (price) => {
  return '৳' + new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0
  }).format(price);
};

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="absolute w-4 h-4 text-gray-300 dark:text-gray-600" />
            <div className="absolute w-2 h-4 overflow-hidden">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
        );
      }
    }
    return stars;
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBrand, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200 py-12 px-4 sm:px-6 lg:px-8 mt-17">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
            <span>🚀 Products Collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold   mb-4">
            Explore Our <span className="text-primary">Products</span> Collection
          </h1>
          <p className="text-xl  max-w-3xl mx-auto mb-8">
            Discover cutting-edge technology, innovative gadgets, and premium electronics curated for tech enthusiasts
          </p>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{trends.length}</div>
              <div className="text-sm  ">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{brands.length - 1}</div>
              <div className="text-sm  ">Premium Brands</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
              <div className="text-sm  ">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.7★</div>
              <div className="text-sm  ">Avg Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="mb-12 bg-base-100 dark:bg-base-200">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 w-full justify-center px-4 py-3 bg-base-100 dark:bg-base-200 border border-base-300 dark:border-base-400 rounded-lg font-semibold"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-base-100 dark:bg-base-300 rounded-2xl p-6 shadow-lg">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products by name, brand, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-base-200 dark:bg-base-400 border border-base-300 dark:border-base-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-semibold   mb-2">
                    Brand
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full px-4 py-3 bg-base-200 dark:bg-base-400 border border-base-300 dark:border-base-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                    >
                      {brands.map(brand => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold   mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-base-200 dark:bg-base-400 border border-base-300 dark:border-base-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-semibold   mb-2">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-base-100  rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-base-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm  ">
                      <span>{formatPrice(minPrice)}</span>
                      <span>{formatPrice(maxPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Sort By Filter */}
                <div>
                  <label className="block text-sm font-semibold   mb-2">
                    Sort By
                  </label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 bg-base-200 dark:bg-base-400 border border-base-300 dark:border-base-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Active Filters and Reset */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-base-300 dark:border-base-400">
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      Search: {searchTerm}
                      <button onClick={() => setSearchTerm('')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedBrand !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      Brand: {selectedBrand}
                      <button onClick={() => setSelectedBrand('All')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      Category: {selectedCategory}
                      <button onClick={() => setSelectedCategory('All')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      <button onClick={() => setPriceRange([minPrice, maxPrice])}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm font-semibold   hover:text-primary transition-colors"
                  >
                    Reset All
                  </button>
                  <div className="text-sm  ">
                    Showing {sortedProducts.length} of {trends.length} products
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <motion.div
            key={JSON.stringify({ searchTerm, selectedBrand, selectedCategory, priceRange, sortBy, currentPage })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="  bg-base-100 rounded-2xl shadow-lg dark:shadow-gray-900/20 overflow-hidden hover:shadow-xl dark:hover:shadow-primary/10 transition-shadow duration-300 group border border-base-300 dark:border-base-300 h-full">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-base-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        width={200}
                        height={180}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-primary dark:bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Brand */}
                    <div className="mb-2">
                      <span className="text-sm font-medium  ">
                        {product.brand}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl font-bold   mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>

  

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {renderStars(product.rating)}
                      </div>
                      <span className="ml-2 text-sm  ">
                        {product.rating}
                      </span>
                    </div>

                    {/* Price and Action Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div>
                        <span className="text-xl font-bold text-primary dark:text-primary">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      {/* Products page-এর ভিতরে View Details button-এর অংশ */}
<Link
  href={`/products/${product.id}`}
  onClick={(e) => {
    // Check if user is logged in
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
    
    if (!authCookie) {
      e.preventDefault(); // Prevent default navigation
      // Redirect to login with callback URL
      window.location.href = `/login?callbackUrl=/products/${product.id}&productId=${product.id}`;
    }
  }}
  className="inline-flex items-center gap-2 bg-gray-900 dark:bg-primary text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-primary/90 transition-all duration-200 text-sm font-semibold group-hover:scale-105"
>
  View Details
   
</Link>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 dark:group-hover:border-primary/30 rounded-2xl transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-base-300 dark:bg-base-400 rounded-full mb-6">
              <Search className="w-10 h-10  " />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No Products Found
            </h3>
            <p className="  mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {sortedProducts.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Page Info */}
              <div className=" ">
                Showing <span className="font-semibold  text-blue-500">
                  {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)}
                </span> of{" "}
                <span className="font-semibold text-blue-500">{sortedProducts.length}</span> products
                <span className="mx-2 text-blue-500">•</span>
                Page <span className="font-semibold text-blue-500">{currentPage}</span> of{" "}
                <span className="font-semibold text-blue-500">{totalPages}</span>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center hover:bg-primary/50 gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-base-200 dark:bg-base-300   cursor-not-allowed'
                      : 'bg-base-200 dark:bg-base-300 hover:bg-base-300 dark:hover:bg-base-400 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum, index) => (
                    pageNum === '...' ? (
                      <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          currentPage === pageNum
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-base-200 dark:bg-base-300 hover:bg-base-300 dark:hover:bg-base-400  '
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center hover:bg-primary/50 gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'bg-base-200 dark:bg-base-300   cursor-not-allowed'
                      : 'bg-base-200 dark:bg-base-300 hover:bg-base-300 dark:hover:bg-base-400  '
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 " />
                </button>
              </div>

              {/* Items Per Page Selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm  ">Items per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {}}
                  className="px-3 py-1 bg-base-200 dark:bg-base-300 border border-base-300 dark:border-base-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                >
                  <option value={16}>16</option>
                  
                </select>
              </div>
            </div>

            {/* Mobile Pagination Summary */}
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm md:hidden">
              Page {currentPage} of {totalPages} • {sortedProducts.length} products
            </div>
          </motion.div>
        )}

        {/* Products Per Page Info */}
        {sortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2">
              <div className="h-px w-20 bg-base-300 dark:bg-base-400"></div>
              <span className="  text-sm">
                <span className='text-blue-500'>{itemsPerPage}</span> products per page
              </span>
              <div className="h-px w-20 bg-base-300 dark:bg-base-400"></div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;