'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const CoffeeSplashContent = dynamic(() => import('./coffee-splash-content'), {
  ssr: false,
});

export function CoffeeSplashWrapper() {
  const searchParams = useSearchParams();
  const showCoffeeSplash = searchParams.get('coffee') === 'true';
  return showCoffeeSplash ? <CoffeeSplashContent /> : null;
}
