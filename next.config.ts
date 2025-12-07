import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  compress: true,
  turbopack: {
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'devicons-react', 'framer-motion'],
  }
};

export default nextConfig;
