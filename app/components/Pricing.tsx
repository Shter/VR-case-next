import offersData from "@/data/pricing.json";
import { OffersGridClient } from "@/components/PlanGrid";

type Offer = {
    id: string;
    title: string;
    headsets: number;
    period: string;
    price: number;
    plusPrice?: number;
    plusUnit?: string;
};

function ServerPlanCard(o: Offer) {
    return (
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
            <a href="https://wa.me/5491127827150" target="_blank" rel="nofollow" className="btn">
                Reservar
            </a>
        </div>
    );
}

export function Pricing() {
    const offers = offersData as Offer[];
    const oneHeadset = offers.filter((o) => o.headsets === 1);

    return (
        <section className="bg-primary py-8">
            <div className="container space-y-10">
                <div className="bg-primary/90 rounded-2xl p-6 border-4 border-white/20 shadow">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                        Alquiler de 2 lentes realidad virtual VR Meta Quest 3
                    </h2>
                    {/* Только этот блок — клиентский, использует хуки/GraphQL */}
                    <OffersGridClient />
                </div>

                <div className="bg-primary/90 rounded-2xl p-6 border-4 border-white/20 shadow">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                        Alquiler de 1 lentes realidad virtual VR Meta Quest 3
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {oneHeadset.map((o) => (
                            <ServerPlanCard key={o.id} {...o} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
