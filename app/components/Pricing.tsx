import { PlanCard } from "@/components/PlanCard";
import offersData   from "@/data/pricing.json";
import type { Offer } from "@/types/pricing";

export function Pricing() {
    const offers = offersData as Offer[];
    const oneHeadset = offers.filter((offer) => offer.headsets === 1);
    const twoHeadset = offers.filter((offer) => offer.headsets === 2);

    return (
        <section className="bg-primary py-8">
            <div className="container space-y-10">
                <div className="bg-primary/90 rounded-2xl p-6 border-4 border-white/20 shadow">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                        Alquiler de 2 lentes realidad virtual VR Meta Quest 3
                    </h2>

                    <div className="grid gap-6 md:grid-cols-3">
                        {twoHeadset.map((offer) => (
                            <PlanCard key={offer.id} offer={offer} />
                        ))}
                    </div>
                </div>

                <div className="bg-primary/90 rounded-2xl p-6 border-4 border-white/20 shadow">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                        Alquiler de 1 lentes realidad virtual VR Meta Quest 3
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {oneHeadset.map((offer) => (
                            <PlanCard key={offer.id} offer={offer} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
