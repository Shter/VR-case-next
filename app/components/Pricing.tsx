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

export function Pricing() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch("/api/graphql", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ query: `{ offers { id title headsets period price plusPrice plusUnit } }` })
        })
            .then((r) => r.json())
            .then((json) => setOffers(json.data.offers));
    }, []);

    const group = (headsets: number) => offers.filter((o) => o.headsets === headsets);

    const PlanCard = (o: Offer) => (
        <div key={o.id} className="card-glass text-white text-center">
            <h3 className="text-xl font-semibold mb-2">{o.title}</h3>
            <div className="text-secondary text-5xl font-extrabold mb-1">${o.price.toLocaleString("es-AR")}</div>
            {o.plusPrice ? (
                <div className="text-secondary text-xl font-bold mb-4">+ ${o.plusPrice.toLocaleString("es-AR")}/{o.plusUnit}</div>
            ) : null}
            <ul className="space-y-2 mb-6">
                <li>{o.headsets} x Meta Quest 3</li>
                <li>Envío gratis</li>
            </ul>
            <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} sx={{ borderRadius: 9999 }}>
                Reservar
            </Button>
        </div>
    );

    return (
        <section className="bg-primary py-8">
            <div className="container space-y-10">
                <div className="bg-primary/90 rounded-2xl p-6 border-4 border-white/20 shadow">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Alquiler de 2 lentes realidad virtual VR Meta Quest 3</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {group(2).map(PlanCard)}
                    </div>
                </div>
                <div className="bg-primary/90 rounded-2xl p-6 border-4 border-white/20 shadow">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Alquiler de 1 lentes realidad virtual VR Meta Quest 3</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {group(1).map(PlanCard)}
                    </div>
                </div>
            </div>

            {/* Reserve Modal */}
            <div className="modal-backdrop" data-open={modalOpen} onClick={() => setModalOpen(false)}>
                <div className="bg-light rounded-2xl p-6 text-center max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
                    <button className="absolute right-4 top-2 text-2xl" onClick={() => setModalOpen(false)} aria-label="Close">×</button>
                    <h3 className="text-xl font-bold mb-2">Contáctanos para reservar</h3>
                    <p className="mb-4">Elige cómo contactarnos:</p>
                    <div className="flex items-center justify-center gap-4">
                        <a href="https://wa.me/5491127827150" rel="nofollow" target="_blank">
                            <img src="/public/assets/icons/whatsapp.svg" alt="WhatsApp" className="h-12 w-12" />
                        </a>
                        <a href="https://instagram.com/vr.case.ar" rel="nofollow" target="_blank">
                            <img src="/public/assets/icons/instagram.svg" alt="Instagram" className="h-12 w-12" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}