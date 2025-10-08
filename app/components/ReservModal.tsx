"use client";

import { useState } from "react";

export const ReserveModal: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div
            className={`modal-backdrop ${modalOpen ? "block" : "hidden"}`}
            onClick={() => setModalOpen(false)}
        >
            <div
                className="bg-light rounded-2xl p-6 text-center max-w-sm mx-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute right-4 top-2 text-2xl"
                    onClick={() => setModalOpen(false)}
                    aria-label="Close"
                >
                    ×
                </button>
                <h3 className="text-xl font-bold mb-2">Contáctanos para reservar</h3>
                <p className="mb-4">Elige cómo contactarnos:</p>
                <div className="flex items-center justify-center gap-4">
                    <a href="https://wa.me/5491127827150" rel="nofollow" target="_blank">
                        <img src="/assets/icons/whatsapp.svg" alt="WhatsApp" className="h-12 w-12" />
                    </a>
                    <a href="https://instagram.com/vr.case.ar" rel="nofollow" target="_blank">
                        <img src="/assets/icons/instagram.svg" alt="Instagram" className="h-12 w-12" />
                    </a>
                </div>
            </div>
        </div>
    );
};