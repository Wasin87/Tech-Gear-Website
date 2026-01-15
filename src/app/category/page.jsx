'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  ArrowRight, 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Tablet,
  Camera,
  Cpu,
  Battery,
  Monitor,
  Zap,
  Wifi,
  PenTool,
  TrendingUp
} from 'lucide-react';
import trends from '@/Data/Products';
import ProductSkeleton from '@/components/skeleton/ProductSkeleton';

// This component uses search params
function CategoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Read query parameters on component mount
  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    
    if (category) {
      // Convert to proper case: 'laptop' -> 'Laptop'
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      setSelectedCategory(formattedCategory);
    }
    
    if (brand) {
      setSelectedBrand(brand);
    }
    
    if (search) {
      setSearchTerm(search);
    }
    
    if (sort) {
      setSortBy(sort);
    }
  }, [searchParams]);

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
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        return products;
    }
  }, [filteredProducts, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Get price range extremes
  const minPrice = useMemo(() => Math.min(...trends.map(p => p.price)), []);
  const maxPrice = useMemo(() => Math.max(...trends.map(p => p.price)), []);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('All');
    setSelectedCategory('All');
    setPriceRange([minPrice, maxPrice]);
    setSortBy('featured');
    setCurrentPage(1);
    // Clear URL params
    router.push('/category');
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (selectedBrand !== 'All') params.set('brand', selectedBrand);
    if (selectedCategory !== 'All') params.set('category', selectedCategory.toLowerCase());
    if (sortBy !== 'featured') params.set('sort', sortBy);
    
    // Update URL without reloading page
    const url = params.toString() ? `/category?${params.toString()}` : '/category';
    router.push(url, { scroll: false });
  }, [searchTerm, selectedBrand, selectedCategory, sortBy, router]);

  // Handle category filter from navbar
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    router.push(`/category?category=${category.toLowerCase()}`, { scroll: true });
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      case 'accessories':
        return <Headphones className="w-5 h-5" />;
      case 'tablet':
        return <Tablet className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'mobile': return 'blue';
      case 'laptop': return 'purple';
      case 'accessories': return 'green';
      case 'tablet': return 'blue';
      default: return 'gray';
    }
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

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Browse by Category</span>
          </div>
          
          {/* Dynamic Title based on selected category */}
          {selectedCategory !== 'All' ? (
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className={`p-3 text-black bg-${getCategoryColor(selectedCategory)}-100 rounded-full`}>
                  {getCategoryIcon(selectedCategory)}
                </div>
                <h1 className="text-4xl  md:text-5xl font-bold  ">
                  {selectedCategory} <span className="text-primary">Collection</span>
                </h1>
              </div>
              <p className="text-xl   max-w-3xl mx-auto">
                Discover our premium collection of {selectedCategory.toLowerCase()} products
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold   mb-4">
                Shop by <span className="text-primary">Category</span>
              </h1>
              <p className="text-xl   max-w-3xl mx-auto mb-8">
                Filter products by category to find exactly what you're looking for
              </p>
            </>
          )}
          
          {/* Category Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.filter(cat => cat !== 'All').map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? `bg-${getCategoryColor(category)}-600 text-white`
                    : 'bg-base-300 hover:bg-base-300   '
                }`}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
                {selectedCategory === category && (
                  <X 
                    className="w-4 h-4" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory('All');
                    }} 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{filteredProducts.length}</div>
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

 {/* Filters Section */}
        <div className="mb-8 bg-base-100  rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5  " />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-base-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Brand Filter */}
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-3 bg-base-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand === 'All' ? 'All Brands' : brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5   pointer-events-none" />
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-base-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5   pointer-events-none" />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedBrand !== 'All' || selectedCategory !== 'All' || sortBy !== 'featured') && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm ">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrand !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand('All')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {sortBy !== 'featured' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Sort: {sortBy.replace('-', ' ')}
                  <button onClick={() => setSortBy('featured')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
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
                <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group border border-base-300 h-full">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden  ">
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
                      <span className="inline-block bg-primary   text-xs font-semibold px-3 py-1 rounded-full">
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
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <Link
                        href={`/products/${product.id}`}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-semibold group-hover:scale-105"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-300 pointer-events-none" />
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-base-300 rounded-full mb-6">
              <Search className="w-10 h-10  " />
            </div>
            <h3 className="text-2xl font-bold   mb-3">
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
                Showing <span className="font-semibold text-blue-400 ">
                  {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)}
                </span> of{" "}
                <span className="font-semibold text-blue-400 ">{sortedProducts.length}</span> products
                <span className="mx-2">•</span>
                Page <span className="font-semibold  text-blue-400 ">{currentPage}</span> of{" "}
                <span className="font-semibold text-blue-400 ">{totalPages}</span>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center hover:bg-primary/50 gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-base-200   cursor-not-allowed'
                      : 'bg-base-200 hover:bg-base-300  '
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 " />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum, index) => (
                    pageNum === '...' ? (
                      <span key={`dots-${index}`} className="px-3 py-2  ">
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          currentPage === pageNum
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-base-200 hover:bg-base-300  '
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
                      ? 'bg-base-200   cursor-not-allowed'
                      : 'bg-base-200 hover:bg-base-300  '
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Items Per Page Selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm ">Items per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {}}
                  className="px-3 py-1 bg-base-200 border border-base-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                >
                  <option value={16}>16</option>
                </select>
              </div>
            </div>

            {/* Mobile Pagination Summary */}
            <div className="mt-6 text-center   text-sm md:hidden">
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
              <div className="h-px w-20 bg-base-300"></div>
              <span className="  text-sm">
                <span className='text-blue-400'>{itemsPerPage} </span>products per page
              </span>
              <div className="h-px w-20 bg-base-300"></div>
            </div>
          </motion.div>
        )}

        {/* Back to All Products */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex  items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

// Main Category page with Suspense for searchParams
export default function CategoryPage() {
  return (
    <Suspense fallback={<ProductSkeleton type="grid" count={8} />}>
      <CategoryContent />
    </Suspense>
  );
}