"use client";

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
                        className="group relative overflow-hidden rounded-2xl border-2 border-dark"
                        onClick={() => handleOpen(image)}
                    >
                        <img src={image} alt="Galería VR" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            <div className="modal-backdrop" data-open={open} onClick={handleClose}>
                {src ? <img src={src} alt="VR Meta Quest 3" className="max-w-[90%] max-h-[90vh] object-contain" /> : null}
            </div>
        </>
    );
}
