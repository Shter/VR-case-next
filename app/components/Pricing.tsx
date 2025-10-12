import offersData from "@/data/pricing.json";
import type { Offer } from "@/types/allTypes";
import { PriceSection } from "@/components/PriceSection";

export function Pricing() {
    const offers = offersData as Offer[];
    const oneHeadset = offers.filter((offer) => offer.headsets === 1);
    const twoHeadset = offers.filter((offer) => offer.headsets === 2);

    return (
        <section className="py-8">
            <div className="container space-y-10">
                <PriceSection
                    title="Alquiler de 2 lentes realidad virtual VR Meta Quest 3"
                    offers={twoHeadset}
                />

                <PriceSection
                    title="Alquiler de 1 lentes realidad virtual VR Meta Quest 3"
                    offers={oneHeadset}
                />
            </div>
        </section>
    );
}
