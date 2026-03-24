'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import type { GalleryImage } from '@/types/allTypes';

const Lightbox = dynamic(
    () => import('@/components/client/FaqGalleryPhotoViewer').then((mod) => mod.FaqGalleryPhotoViewer),
    { ssr: false, loading: () => null }
);

type GalleryLightboxControllerProps = {
    images: GalleryImage[];
    containerId: string;
};

export function GalleryLightboxController({ images, containerId }: GalleryLightboxControllerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [shouldRenderViewer, setShouldRenderViewer] = useState(false);

    useEffect(() => {
        const container = document.getElementById(containerId);

        if (!container) {
            return undefined;
        }

        const handleClick = (event: Event) => {
            const target = event.target as HTMLElement | null;
            const trigger = target?.closest<HTMLElement>('[data-gallery-trigger="true"]');

            if (!trigger) {
                return;
            }

            const indexAttr = trigger.getAttribute('data-gallery-index');
            const parsedIndex = Number(indexAttr);

            if (!Number.isFinite(parsedIndex)) {
                return;
            }

            setCurrentIndex(parsedIndex);
            setOpen(true);
            setShouldRenderViewer(true);
        };

        container.addEventListener('click', handleClick);

        return () => {
            container.removeEventListener('click', handleClick);
        };
    }, [containerId]);

    const handleNavigate = useCallback((nextIndex: number) => {
        const totalItems = images.length;

        if (totalItems === 0) {
            return;
        }

        const normalizedIndex = ((nextIndex % totalItems) + totalItems) % totalItems;
        setCurrentIndex(normalizedIndex);
    }, [images.length]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    if (!shouldRenderViewer) {
        return null;
    }

    return (
        <Lightbox
            images={images}
            currentIndex={currentIndex}
            open={open}
            onCloseAction={handleClose}
            onNavigateAction={handleNavigate}
        />
    );
}
