'use client';

import Image                      from 'next/image';
import { useState }      from 'react';
import clsx                       from 'clsx';
import { FaqGalleryPhotoViewer }  from '@/components/client/FaqGalleryPhotoViewer';
import { galleryImages }          from "@/app/constants";

export function Gallery() {
    const containerClass = "grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-5 overflow-x-auto lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-2 lg:max-h-[680px] lg:overflow-x-hidden lg:overflow-y-auto";
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const handlePreviewClick = (index: number) => {
        setLightboxIndex(index);
    };

    const handleCloseLightbox = () => {
        setLightboxIndex(null);
    };

    const handleNavigateLightbox = (nextIndex: number) => {
        const totalItems = galleryImages.length;

        if (totalItems === 0) {
            return;
        }

        const normalizedIndex = ((nextIndex % totalItems) + totalItems) % totalItems;

        setLightboxIndex(normalizedIndex);
    };

    return (
        <>
            <div className="flex w-full flex-col justify-between lg:w-[55%]">
                <div className={containerClass}>
                    {galleryImages.map((item, index) => {
                        const isActive = lightboxIndex === index;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handlePreviewClick(index)}
                                className={clsx(
                                    'group relative flex min-w-[260px] overflow-hidden rounded-2xl border-2 border-dark duration-300 no-scr',
                                )}
                            >
                                <div className="relative h-56 w-full cursor-pointer">
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={item.width}
                                        height={item.height}
                                        className={clsx(
                                            'h-full w-full object-cover transition duration-500 ease-out',
                                            isActive ? 'scale-105' : 'group-hover:scale-105',
                                        )}
                                        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 80vw"
                                        priority={index === 0}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <FaqGalleryPhotoViewer
                images={galleryImages}
                currentIndex={lightboxIndex ?? 0}
                open={lightboxIndex !== null}
                onCloseAction={handleCloseLightbox}
                onNavigateAction={handleNavigateLightbox}
            />
        </>
    );
}

