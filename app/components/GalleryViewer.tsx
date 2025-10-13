"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryViewerProps } from "@/types/allTypes";

export function GalleryViewer({ images }: GalleryViewerProps) {
    const [open, setOpen] = useState(false);
    const [src, setSrc] = useState<string | null>(null);

    const handleOpen = (image: string) => {
        setSrc(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {images.map((image) => (
                    <button
                        key={image}
                        type="button"
                        className="group block overflow-hidden rounded-2xl border-2 border-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                        onClick={() => handleOpen(image)}
                    >
                        <div className="relative w-full" style={{ paddingBottom: "66%" }}>
                            <Image
                                src={image}
                                alt="Galería VR Meta Quest 3"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                loading="lazy"
                            />
                        </div>
                    </button>
                ))}
            </div>

            <div className="modal-backdrop" data-open={open} onClick={handleClose}>
                {src ? (
                    <div
                        className="relative"
                        style={{ width: "min(90vw, 720px)", aspectRatio: "4 / 5" }}
                    >
                        <Image
                            src={src}
                            alt="VR Meta Quest 3"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 90vw, 720px"
                            priority
                        />
                    </div>
                ) : null}
            </div>
        </>
    );
}
