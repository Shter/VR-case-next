"use client";

import { useCallback, useEffect, useRef } from "react";

export function About() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const videoWrapperRef = useRef<HTMLDivElement | null>(null);

    const syncVideoHeight = useCallback(() => {
        if (typeof window === "undefined") {
            return;
        }

        const wrapper = videoWrapperRef.current;
        const content = contentRef.current;

        if (!wrapper) {
            return;
        }

        const isDesktop = window.matchMedia("(min-width: 768px)").matches;

        if (!isDesktop || !content) {
            wrapper.style.maxHeight = "";
            return;
        }

        wrapper.style.maxHeight = `${content.offsetHeight}px`;
    }, []);

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

        const content = contentRef.current;
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
    }, [syncVideoHeight]);

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
        <section id="about" className="pt-16 pb-10 bg-white">
            <div className="container grid md:grid-cols-2 gap-12 items-start">
                <div ref={contentRef} className="space-y-4 h-fit">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Acerca de nuestro servicio de alquiler de realidad virtual VR en Buenos Aires
                    </h2>
                    <p>
                        VR.CASE ofrece alquiler de lentes VR Meta Quest 3 para cualquier propósito, desde eventos
                        corporativos y fiestas infantiles. Proporcionamos un equipo completo y soporte completo
                        durante el período de alquiler.
                    </p>
                    <p>
                        Nuestra misión es hacer que la realidad virtual sea accesible para todos. Sin la necesidad
                        de comprar equipos costosos, puedes experimentar todas las posibilidades del VR.
                    </p>
                    <p>
                        Nos encargamos de monitorear cuidadosamente el estado de nuestro equipo y actualizamos
                        regularmente la biblioteca de juegos y aplicaciones. Los juegos y aplicaciones se instalan
                        de forma personalizada para cada cliente.
                    </p>
                    <div className="overflow-hidden rounded-2xl border-2 mt-6 border-dark">
                        <img
                            src="/assets/img/two-cases.webp"
                            alt="Alquiler realidad virtual Meta Quest 3"
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                <div ref={videoWrapperRef} className="h-fit md:h-full flex justify-center">
                    <video
                        ref={videoRef}
                        className="rounded-2xl border-2 border-dark max-w-full w-full md:w-auto"
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
            </div>
        </section>
    );
}
