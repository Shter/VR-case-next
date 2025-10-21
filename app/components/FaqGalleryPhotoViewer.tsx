'use client';

import { useEffect, useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import { FaqGalleryLightboxProps } from '@/types/allTypes';

export function FaqGalleryPhotoViewer({
    images,
    currentIndex,
    open,
    onCloseAction,
    onNavigateAction,
}: FaqGalleryLightboxProps) {
    const totalImages = images.length;
    const activeImage = images[currentIndex];
    const hasNavigation = totalImages > 1;
    const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        if (!open || !hasNavigation) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                onNavigateAction(currentIndex + 1);
            }
            if (event.key === 'ArrowLeft') {
                onNavigateAction(currentIndex - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex, hasNavigation, onNavigateAction, open]);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const updateViewportSize = () => {
            setViewportSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateViewportSize();
        window.addEventListener('resize', updateViewportSize);

        return () => {
            window.removeEventListener('resize', updateViewportSize);
        };
    }, [open]);

    const handleShowPrevious = () => {
        onNavigateAction(currentIndex - 1);
    };

    const handleShowNext = () => {
        onNavigateAction(currentIndex + 1);
    };

    const containerDimensions = useMemo(() => {
        if (!activeImage) {
            return { width: 0, height: 0 };
        }

        const widthLimit = viewportSize.width > 0 ? viewportSize.width * 0.9 : activeImage.width;
        const heightLimit = viewportSize.height > 0 ? viewportSize.height * 0.8 : activeImage.height;
        const widthScale = widthLimit / activeImage.width;
        const heightScale = heightLimit / activeImage.height;
        const scale = Math.min(widthScale, heightScale, 1);

        return {
            width: Math.max(Math.round(activeImage.width * scale), 1),
            height: Math.max(Math.round(activeImage.height * scale), 1),
        };
    }, [activeImage, viewportSize.height, viewportSize.width]);

    if (!open || !activeImage) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onCloseAction}
            maxWidth="lg"
            keepMounted
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
                    },
                },
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(10, 14, 24, 0.92)',
                    },
                },

            }}
        >
            <div className="relative flex flex-col justify-center items-center gap-6 text-white">
                <div className="flex w-full items-center justify-center gap-4">
                    {hasNavigation && (
                        <div className="flex items-center justify-center gap-6" onClick={handleShowPrevious}>
                            <IconButton
                                aria-label="Ver imagen anterior"
                                className="transform rounded-full border border-white/40 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
                                size="large"
                            >
                                <ArrowBackIosNewIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </div>
                    )}

                    <div
                        className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/40"
                        style={{
                            width: containerDimensions.width,
                            height: containerDimensions.height,
                            maxWidth: '90vw',
                            maxHeight: '80vh',
                        }}
                    >
                        <Image
                            src={activeImage.src}
                            alt={activeImage.alt}
                            fill
                            className="object-contain"
                            sizes="(min-width: 1536px) 70vw, (min-width: 1280px) 75vw, (min-width: 1024px) 80vw, 90vw"
                            priority
                        />
                    </div>

                    {hasNavigation && (
                        <div className="flex items-center justify-center gap-6" onClick={handleShowNext}>
                            <IconButton
                                aria-label="Ver imagen siguiente"
                                className=" bg-white/10 text-white transition hover:-translate-y-1 hover:bg-white/20"
                                size="large"
                            >
                                <ArrowForwardIosIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </div>

                    )}
                </div>
            </div>
        </Dialog>
    );
}
