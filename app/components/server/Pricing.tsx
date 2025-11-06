import { PriceSection } from '@/components/server/PriceSection';
import { pricingItems } from '@/app/constants';

export function Pricing() {
    return (
        <section id="price" className="py-8">
            <div className="container space-y-8">
                <PriceSection
                    title="Alquiler de 2 VR lentes Meta Quest 3"
                    offers={pricingItems.twoHeadsets}
                />

                <PriceSection
                    title="Alquiler de 1 VR lente Meta Quest 3"
                    offers={pricingItems.oneHeadset}
                />
            </div>
        </section>
    );
}
