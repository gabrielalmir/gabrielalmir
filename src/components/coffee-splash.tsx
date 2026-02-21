import { lazy, Suspense, useSyncExternalStore } from 'react';

const CoffeeSplashContent = lazy(() => import('./coffee-splash-content'));

export function CoffeeSplashWrapper() {
    const showCoffeeSplash = useSyncExternalStore(
        () => () => {},
        () => new URLSearchParams(window.location.search).get('coffee') === 'true',
        () => false
    );

    return showCoffeeSplash ? (
        <Suspense fallback={null}>
            <CoffeeSplashContent />
        </Suspense>
    ) : null;
}
