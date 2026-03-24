'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const RetroParallaxBackground = dynamic(
    () => import('@/components/client/RetroParallaxBackground').then((mod) => mod.RetroParallaxBackground),
    { ssr: false, loading: () => null }
);

type IdleRequestCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;
type IdleWindow = Window & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: { timeout?: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
};

function supportsWebGL() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return false;
    }

    try {
        const canvas = document.createElement('canvas');
        return Boolean(window.WebGLRenderingContext && (
            canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        ));
    } catch {
        return false;
    }
}

export function RetroBackgroundLoader() {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !supportsWebGL()) {
            return undefined;
        }

        const motionMedia = 'matchMedia' in window ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

        if (motionMedia?.matches) {
            return undefined;
        }

        let cancelled = false;
        const enableBackground = () => {
            if (!cancelled) {
                setShouldRender(true);
            }
        };

        const idleWindow = window as IdleWindow;
        const hasIdleCallback = typeof idleWindow.requestIdleCallback === 'function'
            && typeof idleWindow.cancelIdleCallback === 'function';

        const idleHandle = hasIdleCallback
            ? idleWindow.requestIdleCallback!(enableBackground, { timeout: 2500 })
            : window.setTimeout(enableBackground, 1200);

        return () => {
            cancelled = true;
            if (hasIdleCallback) {
                idleWindow.cancelIdleCallback!(idleHandle);
            } else {
                window.clearTimeout(idleHandle);
            }
        };
    }, []);

    if (!shouldRender) {
        return null;
    }

    return <RetroParallaxBackground />;
}
