'use client';

import { useEffect } from 'react';
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
    onClose,
    onNavigate,
}: FaqGalleryLightboxProps) {
    const totalImages = images.length;
    const activeImage = images[currentIndex];
    const hasNavigation = totalImages > 1;

    useEffect(() => {
        if (!open || !hasNavigation) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                onNavigate(currentIndex + 1);
            }
            if (event.key === 'ArrowLeft') {
                onNavigate(currentIndex - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex, hasNavigation, onNavigate, open]);

    if (!open || !activeImage) {
        return null;
    }

    const handleShowPrevious = () => {
        onNavigate(currentIndex - 1);
    };

    const handleShowNext = () => {
        onNavigate(currentIndex + 1);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            keepMounted
            PaperProps={{
                sx: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    overflow: 'visible',
                },
            }}
            BackdropProps={{
                sx: {
                    backgroundColor: 'rgba(10, 14, 24, 0.92)',
                },
            }}
        >
            <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-6 py-8 text-white">
                <div className="flex w-full items-center justify-center">
                    {hasNavigation && (
                        <div className="flex items-center justify-center gap-6" onClick={handleShowPrevious}>
                            <IconButton
                                aria-label="Ver imagen siguiente"
                                className="transform rounded-full border border-white/40 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
                                size="large"
                            >
                                <ArrowBackIosNewIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </div>
                    )}

                    <div className="relative flex h-[80vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/40">
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
