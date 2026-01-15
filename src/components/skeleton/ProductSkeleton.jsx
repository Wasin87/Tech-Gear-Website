 import React from 'react';
 
 const ProductSkeleton = () => {
    return (
     <div className="min-h-screen flex bg-base-100 dark:bg-base-200 items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary font-bold text-xl">Loading...</p>
        </div>
      </div>
    );
 };
 
 export default ProductSkeleton;