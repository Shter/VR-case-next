"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

type Offer = {
    id: string;
    title: string;
    headsets: number;
    period: string;
    price: number;
    plusPrice?: number;
    plusUnit?: string;
};

export function OffersGridClient() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch("/api/graphql", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                query: `{ offers(headsets: 2) { id title headsets period price plusPrice plusUnit } }`
            })
        })
            .then((r) => r.json())
            .then((json) => {console.log(json); setOffers(json?.data?.offers ?? [])});
    }, []);

    const PlanCard = (o: Offer) => (
        <div key={o.id} className="card-glass text-white text-center">
            <h3 className="text-xl font-semibold mb-2">{o.title}</h3>
            <div className="text-secondary text-5xl font-extrabold mb-1">
                ${o.price.toLocaleString("es-AR")}
            </div>
            {o.plusPrice ? (
                <div className="text-secondary text-xl font-bold mb-4">
                    + ${o.plusPrice.toLocaleString("es-AR")}/{o.plusUnit}
                </div>
            ) : null}
            <ul className="space-y-2 mb-6">
                <li>{o.headsets} x Meta Quest 3</li>
                <li>Envío gratis</li>
            </ul>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setModalOpen(true)}
                sx={{ borderRadius: 9999 }}
            >
                Reservar
            </Button>
        </div>
    );

    return (
        <>
            <div className="grid gap-6 md:grid-cols-3">
                {offers.map(PlanCard)}
            </div>
            <div className="modal-backdrop" data-open={modalOpen} onClick={() => setModalOpen(false)}>
                <div className="bg-light rounded-2xl p-6 text-center max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
                    <button className="absolute right-4 top-2 text-2xl" onClick={() => setModalOpen(false)} aria-label="Close">×</button>
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
        </>
    );
}