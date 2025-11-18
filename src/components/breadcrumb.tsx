'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2 text-sm text-vesper-orange/60 mb-6"
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="flex items-center hover:text-vesper-orange transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-3 w-3 text-vesper-orange/40" />
          {item.href && !item.current ? (
            <Link
              href={item.href}
              className="hover:text-vesper-orange transition-colors terminal-prompt"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={`terminal-prompt ${
                item.current ? 'text-vesper-orange' : 'text-vesper-orange/60'
              }`}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </motion.nav>
  );
}

export function useBreadcrumbs(pathname: string, customLabels?: Record<string, string>) {
  const segments = pathname.split('/').filter(Boolean);

  const defaultLabels: Record<string, string> = {
    blog: 'Blog',
    'case-studies': 'Case Studies',
    ...customLabels
  };

  const items: BreadcrumbItem[] = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;

    return {
      label: defaultLabels[segment] || segment,
      href: isLast ? undefined : href,
      current: isLast
    };
  });

  return items;
}
