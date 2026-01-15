"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  Plus,
  Minus,
  Check,
  AlertCircle,
  LogOut
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import trends from '@/Data/Products';
import ProductSkeleton from '@/components/skeleton/ProductSkeleton';

const Details = () => {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id);
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
      const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
      
      if (authCookie) {
        setIsAuthenticated(true);
        
        if (userCookie) {
          try {
            const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
            setUserName(userData.name || userData.email.split('@')[0]);
          } catch (error) {
            console.error('Error parsing user cookie:', error);
          }
        }
      } else {
        // Not authenticated, redirect to login with callback
        router.push(`/login?callbackUrl=/products/${productId}&productId=${productId}`);
        return false;
      }
      
      setCheckingAuth(false);
      return true;
    };

    checkAuth();
  }, [productId, router]);

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
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <Star className="absolute w-5 h-5 text-gray-300 dark:text-gray-600" />
            <div className="absolute w-2.5 h-5 overflow-hidden">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
        );
      }
    }
    return stars;
  };

  // Get product details and related products
  useEffect(() => {
    if (!isAuthenticated || checkingAuth) return;

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const foundProduct = trends.find(p => p.id === productId);
      setProduct(foundProduct);
      
      if (foundProduct) {
        // Get related products (same category, different product)
        const related = trends
          .filter(p => p.category === foundProduct.category && p.id !== productId)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }, 300);
  }, [productId, isAuthenticated, checkingAuth]);

  // Handle quantity changes
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Handle add to cart
  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product?.name} to cart`);
    alert(`${quantity} x ${product?.name} added to cart!`);
  };

  // Handle logout
  const handleLogout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    setUserName('');
    router.push('/login');
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <ProductSkeleton type="details" />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-base-100 dark:bg-base-200 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-base-300 dark:bg-base-400 rounded-full mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Generate multiple image URLs
  const productImages = [
    product.image,
    product.image.replace('w=2070', 'w=600'),
    product.image.replace('w=2070', 'w=800'),
    product.image.replace('w=2070', 'w=1000')
  ];

  // Product features based on category
  const getProductFeatures = () => {
    const baseFeatures = [
      { icon: <Truck className="w-5 h-5" />, text: "Free Shipping", description: "On orders over ৳5000" },
      { icon: <Shield className="w-5 h-5" />, text: "2-Year Warranty", description: "Manufacturer warranty" },
      { icon: <RotateCcw className="w-5 h-5" />, text: "30-Day Returns", description: "Hassle-free returns" },
      { icon: <Check className="w-5 h-5" />, text: "Authentic", description: "100% genuine product" },
    ];

    // Add category-specific features
    if (product.category === 'Mobile') {
      return [
        ...baseFeatures,
        { icon: <Check className="w-5 h-5" />, text: "Unlocked", description: "Works with all carriers" },
        { icon: <Check className="w-5 h-5" />, text: "Latest OS", description: "Pre-installed latest version" },
      ];
    }
    
    if (product.category === 'Laptop') {
      return [
        ...baseFeatures,
        { icon: <Check className="w-5 h-5" />, text: "Pre-installed OS", description: "Windows/MacOS ready" },
        { icon: <Check className="w-5 h-5" />, text: "Free Setup", description: "Basic setup assistance" },
      ];
    }

    return baseFeatures;
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200 py-8 px-4 sm:px-6 lg:px-8 mt-17">
    
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto mb-8">
        <nav className="flex items-center text-sm  ">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2 rotate-180" />
          <Link href="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2 rotate-180" />
          <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2 rotate-180 text-blue-700" />
          <span className="text-blue-600 font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
            {/* Left Column - Images */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden mb-6 group">
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="w-full h-full border border-blue-200 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500 "
                   
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    <Check className="w-3 h-3" />
                    Authentic
                  </span>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square   rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-blue-500 scale-105 ring-2 ring-blue-500/20'
                        : 'border-transparent hover:border-blue-500/50'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                       
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div>
              {/* Brand and Category */}
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-base-300 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                  {product.brand}
                </span>
                <span className="px-3 py-1 bg-base-300 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
                <span className="ml-auto text-sm text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  In Stock
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold   mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-lg font-semibold  ">
                    {product.rating}/5
                  </span>
                </div>
                <span className=" ">
                  • 128 Reviews • 2.5K Sold
                </span>
              </div>

              {/* Price */}
              <div className="mb-8 p-4   rounded-xl">
                <div className="text-4xl md:text-4xl font-bold text-blue-500 dark:text-blue-500 mb-2">
                  {formatPrice(product.price)}
                </div>
                <div className="text-sm text-white bg-green-500 rounded-2xl inline-block px-4 py-1 font-semibold">
                  {product.price > 1000 ? 'Premium Quality Product' : 'Great Value for Money'}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold  mb-3">
                  Product Description
                </h3>
                <p className="  leading-relaxed">
                  {product.description || `Experience premium quality with the ${product.name} from ${product.brand}. This ${product.category.toLowerCase()} features cutting-edge technology, exceptional performance, and a sleek design that sets it apart from the competition. Perfect for tech enthusiasts who demand the best.`}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold   mb-3">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getProductFeatures().map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3   rounded-lg">
                      <div className="p-2  rounded-lg">
                        <div className="text-blue-600 dark:text-blue-400">{feature.icon}</div>
                      </div>
                      <div>
                        <div className="font-semibold  ">
                          {feature.text}
                        </div>
                        <div className="text-sm  ">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Quantity
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="p-3    transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 text-lg font-semibold min-w-[60px] text-center border-x border-gray-300 dark:border-gray-700">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="p-3    transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm  ">
                    <span className="font-semibold text-green-700 dark:text-green-400">Only 12 items</span> left in stock
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Buy Now
                </button>
                <button className="p-4 bg-gray-50 dark:bg-gray-500 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow hover:shadow-lg">
                  <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className=" ">SKU:</span>
                    <span className="ml-2 font-semibold  ">TG-{product.id.toString().padStart(4, '0')}</span>
                  </div>
                  <div>
                    <span className=" ">Availability:</span>
                    <span className="ml-2 font-semibold text-emerald-700 dark:text-emerald-400">In Stock</span>
                  </div>
                  <div>
                    <span className=" ">Shipping:</span>
                    <span className="ml-2 font-semibold  ">2-3 Business Days</span>
                  </div>
                  <div>
                    <span className=" ">Return Policy:</span>
                    <span className="ml-2 font-semibold  ">30 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12  bg-base-100 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-2xl font-bold   mb-6">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Brand', value: product.brand },
              { label: 'Category', value: product.category },
              { label: 'Model', value: product.name.split(' ').slice(-1)[0] },
              { label: 'Warranty', value: '2 Years Manufacturer' },
              { label: 'Color', value: 'Multiple Options Available' },
              { label: 'Weight', value: 'Varies by model' },
              { label: 'Dimensions', value: 'Standard size for category' },
              { label: 'Connectivity', value: 'Bluetooth 5.3, Wi-Fi 6' },
              { label: 'Battery Life', value: 'Up to 24 hours (if applicable)' },
              { label: 'Operating System', value: 'Latest version pre-installed' },
              { label: 'Processor', value: 'High-performance chipset' },
              { label: 'Storage', value: 'Multiple configurations available' },
            ].map((spec, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <span className=" ">{spec.label}:</span>
                <span className="font-semibold  ">{spec.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold  ">
                Related Products
              </h2>
              <Link
                href="/products"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
              >
                View All
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group"
                  onClick={(e) => {
                    // Check authentication first
                    const cookies = document.cookie.split(';');
                    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
                    
                    if (!authCookie) {
                      e.preventDefault();
                      // Redirect to login with callback
                      window.location.href = `/login?callbackUrl=/products/${relatedProduct.id}&productId=${relatedProduct.id}`;
                    }
                  }}
                >
                  <div className=" bg-base-100 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 group-hover:border-blue-500 dark:group-hover:border-blue-500">
                    <div className="relative aspect-square   rounded-xl overflow-hidden mb-4">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         
                      />
                      <div className="absolute top-2 left-2">
                        <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                          {relatedProduct.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold   mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(relatedProduct.price)}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderStars(relatedProduct.rating)}
                        <span className="text-sm   ml-1">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Products Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to All Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Details;