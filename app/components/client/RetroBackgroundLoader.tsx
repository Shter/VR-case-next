'use client';

import dynamic from 'next/dynamic';

const RetroParallaxBackground = dynamic(
    () => import('@/components/client/RetroParallaxBackground').then((mod) => mod.RetroParallaxBackground),
    { ssr: false, loading: () => null }
);

export function RetroBackgroundLoader() {
    return <RetroParallaxBackground />;
}
