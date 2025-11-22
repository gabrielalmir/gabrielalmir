import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'devicons-react', 'framer-motion'],
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'],
    },
  }
};

export default nextConfig;
