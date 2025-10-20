"use client";

import { useCallback, useEffect, useRef } from "react";
import { AboutVideoProps } from "@/types/allTypes";

export function AboutVideo({ referenceSelector }: AboutVideoProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const videoWrapperRef = useRef<HTMLDivElement | null>(null);

    const syncVideoHeight = useCallback(() => {
        if (typeof window === "undefined") {
            return;
        }

        const wrapper = videoWrapperRef.current;
        const content = document.querySelector(referenceSelector) as HTMLElement | null;

        if (!wrapper) {
            return;
        }

        const isDesktop = window.matchMedia("(min-width: 768px)").matches;

        if (!isDesktop || !content) {
            wrapper.style.maxHeight = "";
            wrapper.style.height = "";
            return;
        }

        const targetHeight = Math.min(content.offsetHeight, 600);

        wrapper.style.maxHeight = `${targetHeight}px`;
        wrapper.style.height = `${targetHeight}px`;
    }, [referenceSelector]);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        const play = () => {
            void video.play().catch(() => {});
        };

        const handleLoadedData = () => {
            play();
            syncVideoHeight();
        };

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                play();
            }
        };

        play();
        video.addEventListener("loadeddata", handleLoadedData);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            video.removeEventListener("loadeddata", handleLoadedData);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [syncVideoHeight]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const handleResize = () => {
            syncVideoHeight();
        };

        syncVideoHeight();
        window.addEventListener("resize", handleResize);

        const content = document.querySelector(referenceSelector) as HTMLElement | null;
        let observer: ResizeObserver | null = null;

        if (content && "ResizeObserver" in window) {
            observer = new ResizeObserver(() => {
                syncVideoHeight();
            });
            observer.observe(content);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            observer?.disconnect();
        };
    }, [referenceSelector, syncVideoHeight]);

    const handleVideoError = () => {
        const video = videoRef.current;
        if (!video) {
            return;
        }

        const currentSrc = video.currentSrc || video.dataset.src || video.src;

        if (currentSrc) {
            video.src = "";

            requestAnimationFrame(() => {
                video.src = currentSrc;
                video.load();
            });
        }
    };

    return (
        <div
            ref={videoWrapperRef}
            className="order-3 md:order-3 h-fit md:h-full md:max-h-[600px] w-full md:w-auto flex justify-center md:justify-end md:self-stretch"
        >
            <video
                ref={videoRef}
                className="rounded-2xl border-2 border-dark max-w-full w-full md:w-auto h-full object-contain bg-[var(--color-amber)]"
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
                onLoadedMetadata={syncVideoHeight}
                onError={handleVideoError}
            >
                <source src="/assets/video/action.webm" type="video/webm" />
                Tu navegador no soporta el video.
            </video>
        </div>
    );
}
