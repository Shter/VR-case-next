'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';

const INITIAL_LOADER_MIN_MS = 2000;

const RetroParallaxBackground = dynamic<{ onReadyAction?: () => void }>(
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

function RetroLoaderOverlay({ hidden }: { hidden: boolean }) {
    return (
        <div
            className={[
                'fixed inset-0 z-[2147483647] flex flex-col items-center justify-center gap-8 overflow-hidden bg-[#04000f] touch-none',
                'transition-opacity duration-500',
                hidden ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
            ].join(' ')}
            aria-hidden="true"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#050013] via-[#0b0124] to-[#050013]" />
            <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,45,149,0.25),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(0,255,224,0.2),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(124,77,255,0.2),transparent_35%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 opacity-40 [background-image:linear-gradient(transparent,rgba(4,0,23,0.8)),repeating-linear-gradient(0deg,rgba(255,255,255,0.08),rgba(255,255,255,0.08)_2px,transparent_2px,transparent_40px)]" />
            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                <div className="relative flex h-28 w-28 items-center justify-center">
                    <div className="absolute inset-2 rounded-full border-3 border-white/20 blur-lg" />
                    <div className="absolute inset-0 rounded-full border-3 border-[#ff2d95]/40" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#00ffe0] border-r-transparent border-b-transparent border-l-transparent animate-[spin_2.4s_linear_infinite]" />
                    <div className="absolute inset-4 rounded-full border-2 border-[#7c4dff]/30 animate-[spin_4s_linear_infinite_reverse]" />
                    <div className="h-3 w-3 rounded-full bg-[#ff2d95] shadow-[0_0_25px_rgba(255,45,149,0.8)]" />
                </div>
                <h3 className="font-bold header-logo">
                    VR<span className="text-secondary">.CASE</span>
                </h3>
            </div>
        </div>
    );
}

export function RetroBackgroundLoader() {
    const [shouldRender, setShouldRender] = useState(false);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [hasHydrated, setHasHydrated] = useState(false);
    const [hasDocumentLoaded, setHasDocumentLoaded] = useState(false);
    const [isBackgroundReady, setIsBackgroundReady] = useState(false);
    const loaderStartRef = useRef<number | null>(null);
    const loaderTimeoutRef = useRef<number | null>(null);
    const navigationShowTimeoutRef = useRef<number | null>(null);
    const navigationHideTimeoutRef = useRef<number | null>(null);
    const navigationVisibleSinceRef = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        loaderStartRef.current = performance.now();

        return () => {
            if (loaderTimeoutRef.current !== null) {
                window.clearTimeout(loaderTimeoutRef.current);
            }

            if (navigationShowTimeoutRef.current !== null) {
                window.clearTimeout(navigationShowTimeoutRef.current);
            }

            if (navigationHideTimeoutRef.current !== null) {
                window.clearTimeout(navigationHideTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const markHydrated = () => setHasHydrated(true);
        const raf = window.requestAnimationFrame(markHydrated);
        return () => window.cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return undefined;
        }

        if (document.readyState === 'complete') {
            const raf = window.requestAnimationFrame(() => setHasDocumentLoaded(true));
            return () => window.cancelAnimationFrame(raf);
        }

        const handleLoad = () => {
            setHasDocumentLoaded(true);
        };

        window.addEventListener('load', handleLoad, { once: true });
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    const scheduleLoaderHide = useCallback(() => {
        if (typeof window === 'undefined' || !isLoaderVisible) {
            return;
        }

        if (navigationVisibleSinceRef.current !== null) {
            return;
        }

        const now = performance.now();
        const start = loaderStartRef.current ?? now;
        const elapsed = now - start;
        const remaining = Math.max(INITIAL_LOADER_MIN_MS - elapsed, 0);

        if (loaderTimeoutRef.current !== null) {
            window.clearTimeout(loaderTimeoutRef.current);
        }

        loaderTimeoutRef.current = window.setTimeout(() => {
            setIsLoaderVisible(false);
        }, remaining);
    }, [isLoaderVisible]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        if (!supportsWebGL()) {
            const raf = window.requestAnimationFrame(() => setIsBackgroundReady(true));
            return () => window.cancelAnimationFrame(raf);
        }

        const motionMedia = 'matchMedia' in window ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

        if (motionMedia?.matches) {
            const raf = window.requestAnimationFrame(() => setIsBackgroundReady(true));
            return () => window.cancelAnimationFrame(raf);
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

    const handleBackgroundReady = useCallback(() => {
        setIsBackgroundReady(true);
    }, []);

    const isPageReady = hasHydrated && hasDocumentLoaded;

    useEffect(() => {
        if (!isPageReady || !isBackgroundReady) {
            return;
        }

        scheduleLoaderHide();
    }, [isPageReady, isBackgroundReady, scheduleLoaderHide]);

    return (
        <>
            <RetroLoaderOverlay hidden={!isLoaderVisible} />
            {shouldRender ? <RetroParallaxBackground onReadyAction={handleBackgroundReady} /> : null}
        </>
    );
}
