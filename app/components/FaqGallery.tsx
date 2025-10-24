'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx                      from 'clsx';
import { FaqGalleryPhotoViewer } from '@/components/client/FaqGalleryPhotoViewer';
import type { FaqGalleryItem }   from '@/types/allTypes';
import { faqItems }              from "@/app/constants";

export function FaqGallery() {
    const [activeFaqId, setActiveFaqId] = useState<string | null>(() => faqItems[0]?.id ?? null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const closingTimeoutRef = useRef<number | null>(null);

    const galleryImages = useMemo(() => faqItems.map((item) => item.image), []);

    const handleFaqToggle = (itemId: string) => {
        if (closingTimeoutRef.current) {
            window.clearTimeout(closingTimeoutRef.current);
            closingTimeoutRef.current = null;
        }

        if (activeFaqId === itemId) {
            setActiveFaqId(null);
            return;
        }

        if (activeFaqId) {
            setActiveFaqId(null);
            closingTimeoutRef.current = window.setTimeout(() => {
                setActiveFaqId(itemId);
                closingTimeoutRef.current = null;
            }, 300);
            return;
        }

        setActiveFaqId(itemId);
    };

    useEffect(() => {
        return () => {
            if (closingTimeoutRef.current) {
                window.clearTimeout(closingTimeoutRef.current);
            }
        };
    }, []);

    const handlePreviewClick = (index: number) => {
        setLightboxIndex(index);
    };

    const handleCloseLightbox = () => {
        setLightboxIndex(null);
    };

    const handleNavigateLightbox = (nextIndex: number) => {
        const totalItems = faqItems.length;
        if (totalItems === 0) {
            return;
        }

        const normalizedIndex = ((nextIndex % totalItems) + totalItems) % totalItems;

        setLightboxIndex(normalizedIndex);
    };

    const renderPreview = (item: FaqGalleryItem, index: number) => {
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
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        className={clsx(
                            'object-cover transition duration-500 ease-out',
                            isActive ? 'scale-105' : 'group-hover:scale-105',
                        )}
                        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 80vw"
                        priority={index === 0}
                    />

                </div>
            </button>
        );
    };

    return (
        <section id="faq-gallery" className="bg-white py-10 md:py-16">
            <div className="container">
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-12 lg:flex-row">
                        <aside className="flex justify-center w-full flex-col lg:w-[45%] lg:max-h-[680px] lg:overflow-y-auto">
                            <h2 className="text-3xl font-bold text-dark md:text-4xl pb-5">
                                Todo lo que querés saber antes de vivir la VR
                            </h2>

                            <ul className="space-y-2 lg:pr-4">
                                {faqItems.map((item) => {
                                    const isActive = item.id === activeFaqId;

                                    return (
                                        <li key={item.id}>
                                            <button
                                                type="button"
                                                onClick={() => handleFaqToggle(item.id)}
                                                className={clsx(
                                                    'group w-full rounded-2xl border-2 border-secondary bg-white px-5 py-4 text-left transition',
                                                    ' bg-secondary cursor-pointer'
                                                )}
                                                aria-expanded={isActive}
                                                aria-controls={`faq-panel-${item.id}`}
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <div>
                                                        <p className="text-base font-semibold text-dark">{item.question}</p>
                                                        <p
                                                            id={`faq-panel-${item.id}`}
                                                            className={clsx(
                                                                'overflow-hidden text-sm leading-relaxed text-dark/70 transition-all duration-300',
                                                                isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                                                            )}
                                                            aria-hidden={!isActive}
                                                        >
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={clsx(
                                                            'inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition',
                                                            isActive
                                                                ? 'border-transparent bg-accent text-black'
                                                                : 'border-dark/10 bg-light text-dark/70 group-hover:text-dark',
                                                        )}
                                                        aria-hidden="true"
                                                    >
                                                        {isActive ? '-' : '+'}
                                                    </span>
                                                </div>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>

                        <div className="flex w-full flex-col justify-between lg:w-[55%]">
                            <div
                                className="grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-5 overflow-x-auto lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-2 lg:max-h-[680px] lg:overflow-x-hidden lg:overflow-y-auto"
                            >
                                {faqItems.map((item, index) => renderPreview(item, index))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FaqGalleryPhotoViewer
                images={galleryImages}
                currentIndex={lightboxIndex ?? 0}
                open={lightboxIndex !== null}
                onCloseAction={handleCloseLightbox}
                onNavigateAction={handleNavigateLightbox}
            />
        </section>
    );
}
