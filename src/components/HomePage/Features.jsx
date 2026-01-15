'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Truck, 
  Clock, 
  Award, 
  Headphones, 
  CreditCard,
  RefreshCw,
  Globe
} from 'lucide-react';
import Link from 'next/link';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <Truck className="w-10 h-10" />,
      title: "Free & Fast Shipping",
      description: "Free shipping on all orders over $99. Express delivery available.",
      stat: "2-3 Business Days",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      id: 2,
      icon: <Shield className="w-10 h-10" />,
      title: "2-Year Warranty",
      description: "All products come with 2-year manufacturer warranty.",
      stat: "24 Months Coverage",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      id: 3,
      icon: <Clock className="w-10 h-10" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support via chat, phone, and email.",
      stat: "Instant Response",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      id: 4,
      icon: <RefreshCw className="w-10 h-10" />,
      title: "Easy Returns",
      description: "30-day hassle-free return policy on all products.",
      stat: "No Questions Asked",
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/20"
    },
    {
      id: 5,
      icon: <Award className="w-10 h-10" />,
      title: "Premium Quality",
      description: "Curated selection of high-quality, authentic products.",
      stat: "Authentic Brands",
      color: "text-rose-600",
      bgColor: "bg-rose-100 dark:bg-rose-900/20"
    },
    {
      id: 6,
      icon: <CreditCard className="w-10 h-10" />,
      title: "Secure Payment",
      description: "Multiple secure payment options with encryption.",
      stat: "100% Secure",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20"
    },
    {
      id: 7,
      icon: <Headphones className="w-10 h-10" />,
      title: "Expert Advice",
      description: "Get personalized recommendations from tech experts.",
      stat: "Free Consultation",
      color: "text-cyan-600",
      bgColor: "bg-cyan-100 dark:bg-cyan-900/20"
    },
    {
      id: 8,
      icon: <Globe className="w-10 h-10" />,
      title: "Worldwide Delivery",
      description: "We ship to over 100 countries worldwide.",
      stat: "Global Reach",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20"
    }
  ];

  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "98%", label: "Positive Reviews" },
    { value: "24/7", label: "Support Available" },
    { value: "150+", label: "Brand Partners" }
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
    hidden: { y: 30, opacity: 0 },
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              The <span className="text-secondary">TechGear</span> Advantage
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience unparalleled service, quality, and support with every purchase
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-base-300">
                {/* Icon Container */}
                <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <div className={`text-sm font-semibold ${feature.color}`}>
                    {feature.stat}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 transform rotate-45 translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Experience Premium Tech?
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust TechGadget for all their technology needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about" className="px-8 py-4 bg-white text-primary rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg">
                About Us
              </Link>
              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;