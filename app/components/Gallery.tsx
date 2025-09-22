"use client";
import { useState } from "react";

export function Gallery() {
    const images = [
        "/assets/img/on-station.webp",
        "/assets/img/in-case.webp",
        "/assets/img/on-wood.webp"
    ];
    const [open, setOpen] = useState(false);
    const [src, setSrc] = useState<string | null>(null);

    return (
        <section id="gallery" className="bg-white py-16">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Nuestras lentes virtual realidad VR Meta Quest 3</h2>
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {images.map((s) => (
                        <button key={s} className="group relative overflow-hidden rounded-2xl border border-dark/10" onClick={() => { setSrc(s); setOpen(true); }}>
                            <img src={s} alt="Galería VR" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
            <div className="modal-backdrop" data-open={open} onClick={() => setOpen(false)}>
                {src ? <img src={src} alt="VR Meta Quest 3" className="max-w-[90%] max-h-[90vh] object-contain" /> : null}
            </div>
        </section>
    );
}