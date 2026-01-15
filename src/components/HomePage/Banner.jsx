'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Tag, 
  Shield, 
  Truck 
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';


const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Banner data with gadget images
  const bannerSlides = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      subtitle: "Experience the Future",
      description: "Revolutionary A17 Pro chip, Titanium design. Get 10% off on pre-orders.",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop",
      buttonText: "Shop Now",
      buttonLink: "/items/1",
      color: "from-blue-900/70 to-blue-600/40",
      badge: "New Release"
    },
    {
      id: 2,
      title: "Gaming Laptops Collection",
      subtitle: "Level Up Your Game",
      description: "Powerful RTX 40 series, high refresh rate displays. Starting at $999",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop",
      buttonText: "Explore Gaming",
      buttonLink: "/items?category=laptop",
      color: "from-purple-900/70 to-purple-600/40",
      badge: "Hot Deal"
    },
    {
      id: 3,
      title: "Premium Accessories",
      subtitle: "Complete Your Setup",
      description: "Wireless headphones, smart watches, and charging solutions",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
      buttonText: "Browse Accessories",
      buttonLink: "/items?category=accessories",
      color: "from-emerald-900/70 to-emerald-600/40",
      badge: "Bundle Offer"
    },
    {
      id: 4,
      title: "Tablets & E-Readers",
      subtitle: "Work & Entertainment",
      description: "High-performance tablets for productivity and creativity",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2070&auto=format&fit=crop",
      buttonText: "View Tablets",
      buttonLink: "/items?category=tablet",
      color: "from-amber-900/70 to-amber-600/40",
      badge: "Limited Stock"
    }
  ];

  // Features section
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "On orders over $99"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "2-Year Warranty",
      description: "On all products"
    },
    {
      icon: <Tag className="w-6 h-6" />,
      title: "Best Price",
      description: "Price match guarantee"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Easy Returns",
      description: "30-day return policy"
    }
  ];

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.4, ease: "backOut" }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative w-full overflow-hidden mt-16">
      {/* Main Banner Slider */}
      <div className="relative h-[85vh] md:h-[90vh]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className} !w-3 !h-3 !bg-white/80 hover:!bg-white !mx-1 !opacity-70"></span>`;
            },
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          effect="fade"
          speed={1000}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="h-full"
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                {/* Background Image with Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />
                </div>

                {/* Content */}
                <div className="relative h-full container mx-auto px-4 md:px-8 flex items-center">
                  <div className="max-w-2xl text-white">
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold">{slide.badge}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                      variants={titleVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.h2
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-xl md:text-2xl text-blue-100 mb-4 font-medium"
                    >
                      {slide.subtitle}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-lg text-gray-200 mb-8 max-w-lg"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Button */}
                    <motion.button
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2 group"
                      onClick={() => window.location.href = slide.buttonLink}
                    >
                      {slide.buttonText}
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev !w-12 !h-12 !bg-white/20 !backdrop-blur-sm !rounded-full !left-4 hover:!bg-white/30">
            <ChevronLeft className="w-6 h-6 text-white" />
          </div>
          <div className="swiper-button-next !w-12 !h-12 !bg-white/20 !backdrop-blur-sm !rounded-full !right-4 hover:!bg-white/30">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </Swiper>

        {/* Slide Progress Bar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-48 h-1 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            key={activeSlide}
          />
        </div>
      </div>

 
 
    </div>
  );
};

export default Banner;