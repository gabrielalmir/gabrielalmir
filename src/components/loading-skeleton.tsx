'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'button';
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ 
  variant = 'card', 
  className = '', 
  count = 1 
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, index) => {
    switch (variant) {
      case 'card':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`terminal-window border border-terminal-green/20 p-6 ${className}`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 loading-skeleton rounded" />
                  <div className="w-20 h-3 loading-skeleton rounded" />
                </div>
                <div className="w-16 h-3 loading-skeleton rounded" />
              </div>
              
              {/* Title */}
              <div className="w-3/4 h-6 loading-skeleton rounded" />
              
              {/* Subtitle */}
              <div className="w-1/2 h-4 loading-skeleton rounded" />
              
              {/* Content */}
              <div className="space-y-2">
                <div className="w-full h-3 loading-skeleton rounded" />
                <div className="w-5/6 h-3 loading-skeleton rounded" />
                <div className="w-4/5 h-3 loading-skeleton rounded" />
              </div>
              
              {/* Tags */}
              <div className="flex gap-2">
                <div className="w-16 h-6 loading-skeleton rounded" />
                <div className="w-20 h-6 loading-skeleton rounded" />
                <div className="w-14 h-6 loading-skeleton rounded" />
              </div>
              
              {/* Button */}
              <div className="w-full h-10 loading-skeleton rounded" />
            </div>
          </motion.div>
        );
        
      case 'text':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`space-y-2 ${className}`}
          >
            <div className="w-full h-4 loading-skeleton rounded" />
            <div className="w-5/6 h-4 loading-skeleton rounded" />
            <div className="w-4/5 h-4 loading-skeleton rounded" />
          </motion.div>
        );
        
      case 'avatar':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center gap-3 ${className}`}
          >
            <div className="w-12 h-12 loading-skeleton rounded-full" />
            <div className="space-y-2">
              <div className="w-24 h-4 loading-skeleton rounded" />
              <div className="w-32 h-3 loading-skeleton rounded" />
            </div>
          </motion.div>
        );
        
      case 'button':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`w-32 h-10 loading-skeleton rounded ${className}`}
          />
        );
        
      default:
        return (
          <div
            key={index}
            className={`w-full h-4 loading-skeleton rounded ${className}`}
          />
        );
    }
  });
  
  return <>{skeletons}</>;
}

// Componente específico para loading de blog posts
export function BlogPostSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <LoadingSkeleton variant="card" count={count} />
    </div>
  );
}

// Componente específico para loading de case studies
export function CaseStudySkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <LoadingSkeleton variant="card" count={count} />
    </div>
  );
}

// Componente para loading de artigo completo
export function ArticleSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="terminal-window border border-terminal-green/20 p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 loading-skeleton rounded" />
            <div className="w-20 h-4 loading-skeleton rounded" />
          </div>
          
          <div className="w-4/5 h-8 loading-skeleton rounded" />
          <div className="w-3/5 h-6 loading-skeleton rounded" />
          
          <div className="space-y-2">
            <div className="w-full h-4 loading-skeleton rounded" />
            <div className="w-5/6 h-4 loading-skeleton rounded" />
          </div>
          
          <div className="flex gap-2">
            <div className="w-16 h-6 loading-skeleton rounded" />
            <div className="w-20 h-6 loading-skeleton rounded" />
            <div className="w-14 h-6 loading-skeleton rounded" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="terminal-window border border-terminal-green/20 p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 loading-skeleton rounded" />
            <div className="w-32 h-4 loading-skeleton rounded" />
          </div>
          
          <LoadingSkeleton variant="text" count={8} className="mb-4" />
          
          <div className="bg-zinc-900 border border-terminal-green/20 rounded p-4">
            <LoadingSkeleton variant="text" count={4} />
          </div>
          
          <LoadingSkeleton variant="text" count={6} />
        </div>
      </div>
    </div>
  );
}

// Hook para simular loading state
export function useLoadingState(duration: number = 1500) {
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  return isLoading;
}

// Importação do React para o hook
import React from 'react';