import { lazy, Suspense, useEffect, useState } from 'react';

const CoffeeSplashContent = lazy(() => import('./coffee-splash-content'));

export function CoffeeSplashWrapper() {
    const [showCoffeeSplash, setShowCoffeeSplash] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setShowCoffeeSplash(params.get('coffee') === 'true');
    }, []);

    return showCoffeeSplash ? (
        <Suspense fallback={null}>
            <CoffeeSplashContent />
        </Suspense>
    ) : null;
}
