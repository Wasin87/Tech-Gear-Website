'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Globe, 
  Heart, 
  Target, 
  Shield,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "50K+", label: "Happy Customers", description: "Serving customers worldwide" },
    { icon: <Award className="w-8 h-8" />, value: "4.8★", label: "Average Rating", description: "Based on customer reviews" },
    { icon: <Globe className="w-8 h-8" />, value: "100+", label: "Countries", description: "Shipping worldwide" },
    { icon: <TrendingUp className="w-8 h-8" />, value: "24/7", label: "Support", description: "Always here to help" },
  ];

  const values = [
    {
      icon: <Target className="w-10 h-10" />,
      title: "Customer First",
      description: "We prioritize customer satisfaction above everything else",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous quality checks",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Passion for Tech",
      description: "We're tech enthusiasts passionate about innovation",
      color: "text-rose-600",
      bgColor: "bg-rose-100 dark:bg-rose-900/20"
    },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      description: "Tech visionary with 15+ years in electronics industry"
    },
{
  name: "Sarah Chen",
  role: "Head of Product",
  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
  description: "Product expert specializing in gadget curation"
},
{
  name: "Marcus Lee",
  role: "Tech Director",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
  description: "Technical wizard ensuring product authenticity"
},
    {
      name: "Emma Davis",
      role: "Customer Success",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop",
      description: "Dedicated to providing exceptional customer experience"
    },
  ];

  const features = [
    "Authentic products only",
    "2-year warranty on all products",
    "Free shipping on orders over $99",
    "30-day hassle-free returns",
    "24/7 customer support",
    "Secure payment processing",
    "Price match guarantee",
    "Environmental sustainability focus"
  ];

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              <span>Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  e mb-6">
              Redefining <span className="text-primary">Tech</span> Shopping Experience
            </h1>
            <p className="text-xl   mb-8 max-w-3xl mx-auto">
              At TechGear, we're passionate about bringing you the latest and most innovative technology products with uncompromising quality and service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary   rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all duration-300"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                  <div className="text-primary">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold   mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold   mb-1">
                  {stat.label}
                </div>
                <div className="text-sm  ">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="TechGear Team"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
                <span>Our Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold   mb-6">
                From Garage to Global
              </h2>
              <div className="space-y-4  ">
                <p>
                  Founded in 2010, TechGear started as a small passion project in a garage, driven by our love for technology and innovation. What began as a hobby quickly grew into a mission to make cutting-edge technology accessible to everyone.
                </p>
                <p>
                  Today, we're proud to be one of the leading tech retailers, connecting millions of customers with the latest gadgets and electronics from around the world. Our commitment to quality, authenticity, and customer satisfaction remains at the core of everything we do.
                </p>
                <p>
                  We carefully curate every product in our collection, ensuring that each item meets our high standards for performance, durability, and value. From smartphones to smart home devices, we bring you the future of technology today.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-base-100 dark:bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary dark:bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
              <span>What Drives Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold   mb-4">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="text-xl   max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-base-100   rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${value.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  <div className={value.color}>
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold   mb-3">
                  {value.title}
                </h3>
                <p className=" ">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
              <span>Meet the Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold   mb-4">
              The Minds Behind <span className="text-primary">TechGear</span>
            </h2>
            <p className="text-xl   max-w-2xl mx-auto">
              Passionate professionals dedicated to revolutionizing tech retail
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold   mb-1">
                  {member.name}
                </h3>
                <div className="text-primary font-semibold mb-2">
                  {member.role}
                </div>
                <p className="  text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100 dark:bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold   mb-6">
                The <span className="text-primary">TechGear</span> Difference
              </h2>
              <p className="text-lg   mb-8">
                We go above and beyond to ensure your shopping experience is exceptional
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                    <span className=" ">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
                  alt="TechGear Warehouse"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm font-semibold">Authentic Products</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-center shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience the Future?
            </h2>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust TechGear for all their technology needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/items"
                className="px-8 py-4 bg-white text-primary rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Shop Our Collection
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;