import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'devicons-react', 'framer-motion'],
    optimizeCss: true,
  }
};

export default nextConfig;
