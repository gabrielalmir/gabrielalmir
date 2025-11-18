'use client';

import { GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import { ModernLogo } from './modern-logo';

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-screen border-b border-vesper-orange/10 bg-background/95 backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity" aria-label='logo gabrielalmir'>
            <ModernLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { href: "/#sobre", label: "Sobre" },
              { href: "/#habilidades", label: "Skills" },
              { href: "/#projetos", label: "Projetos" },
              { href: "/blog", label: "Blog" },
              { href: "/#contato", label: "Contato" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-foreground/70 hover:text-vesper-orange transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vesper-orange group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { href: 'https://linkedin.com/in/gabrielalmir', icon: LinkedinIcon, label: 'LinkedIn' },
              { href: 'https://github.com/gabrielalmir', icon: GithubIcon, label: 'GitHub' },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="text-foreground/60 hover:text-vesper-orange transition-colors"
                aria-label={label}
                target="_blank"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
