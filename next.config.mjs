/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  images: {
    remotePatterns: [
      // For ibb.co images (correct format)
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
      // For ibb.co.com images (old format)
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        pathname: '/**',
      },
      // For ibb.co direct links
      {
        protocol: 'https',
        hostname: 'ibb.co',
        pathname: '/**',
      },
      // For Unsplash images
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
        pathname: '/**',
      },
      // For other image sources
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      // For Picsum photos
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      // For placeholder images
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      // For randomuser.me
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
      // For your local development
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      // Add any other domains you might use
      {
        protocol: 'https',
        hostname: '**', // This allows all HTTPS domains (use with caution in production)
      }
    ],
  },
  
  // Optional: Add other configurations
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-domain.com']
    }
  }
};

export default nextConfig;