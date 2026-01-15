'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

// Import your data
import trends from '@/Data/NewTrends';
import Image from 'next/image';
 

const NewTrends = () => {
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
          <Star
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
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
          <Star
            key={i}
            className="w-4 h-4 text-gray-300 dark:text-gray-600"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
            <span>🔥 Trending Now</span>
          </div>
          <h2 className="text-3xl font-bold   sm:text-4xl">
            Latest <span className="text-primary">Trends</span>
          </h2>
          <p className="mt-4 text-lg   max-w-2xl mx-auto">
            Discover the newest and most innovative products in the market
          </p>
        </motion.div>

        {/* Grid of Cards with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {trends.map((trend, index) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className=" rounded-2xl shadow-lg bg-base-100 dark:shadow-gray-900/20 overflow-hidden hover:shadow-xl dark:hover:shadow-primary/10 transition-shadow duration-300 group border border-base-300 dark:border-base-400 h-full">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-base-200">
                  <div className="absolute inset-0 flex items-center justify-center ">
                <Image
                  width={200}
                  height={180}
                  src={trend.image}
                  alt={trend.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary dark:bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {trend.category}
                    </span>
                  </div>
                  
  
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Brand */}
                  <div className="mb-2">
                    <span className="text-sm font-medium ">
                      {trend.brand}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold   mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                    {trend.name}
                  </h3>
 

                  {/* Rating - Alternative simpler display */}
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {renderStars(trend.rating)}
                    </div>
                    <span className="ml-2 text-sm  ">
                      {trend.rating}
                    </span>
                  </div>

                  {/* Price and Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div>
                        <span className="text-xl font-bold text-primary dark:text-primary">
                          {formatPrice(trend.price)}
                        </span>
                      </div>
                    <Link
                      href={`/products/${trend.id}`}
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

        {/* View All Button with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white rounded-lg text-base font-semibold transition-all duration-200 group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NewTrends;