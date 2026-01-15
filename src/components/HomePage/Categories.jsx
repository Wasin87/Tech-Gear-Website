'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Tablet, 
  Watch, 
  Camera,
  Gamepad2,
  Speaker
} from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      icon: <Smartphone className="w-8 h-8" />,
      
      description: "Latest models with cutting-edge technology",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop",
      link: "/category?category=mobile",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Laptops",
      icon: <Laptop className="w-8 h-8" />,
       
      description: "Powerful machines for work and play",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
      link: "/category?category=laptop",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      name: "Headphones",
      icon: <Headphones className="w-8 h-8" />,
       
      description: "Immersive audio experience",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      link: "/category?category=accessories",
      color: "bg-emerald-500",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      id: 4,
      name: "Tablets",
      icon: <Tablet className="w-8 h-8" />,
       
      description: "Portable productivity",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2070&auto=format&fit=crop",
      link: "/category?category=tablet",
      color: "bg-amber-500",
      gradient: "from-amber-500 to-amber-600"
    },
    {
      id: 5,
      name: "Smart Watches",
      icon: <Watch className="w-8 h-8" />,
       
      description: "Stay connected on the go",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
      link: "/category?category=wearable",
      color: "bg-rose-500",
      gradient: "from-rose-500 to-rose-600"
    },
    {
      id: 6,
      name: "Cameras",
      icon: <Camera className="w-8 h-8" />,
       
      description: "Capture life's moments",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2053&auto=format&fit=crop",
      link: "/category?category=camera",
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      id: 7,
      name: "Gaming",
      icon: <Gamepad2 className="w-8 h-8" />,
       
      description: "Ultimate gaming gear",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      link: "/category?category=gaming",
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 8,
      name: "Speakers",
      icon: <Speaker className="w-8 h-8" />,
       
      description: "Premium sound systems",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
      link: "/category?category=audio",
      color: "bg-cyan-500",
      gradient: "from-cyan-500 to-cyan-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-base-100">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Browse Categories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Explore Our <span className="text-primary">Product</span> Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the perfect gadget from our carefully curated categories
            </p>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={category.link}>
                <div className="relative overflow-hidden rounded-2xl bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Icon */}
                    <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>

                    {/* Category Info */}
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                          {category.count}
                        </span>
                         
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;